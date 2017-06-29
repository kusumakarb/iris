declare const $;

import "../../bundles/file-upload";
import {FileUploadService} from "../../../services/file-upload-service";
import {autoinject, customAttribute, bindingMode, bindable} from "aurelia-framework";

// import {Configuration, User} from '../../config/configuration';

@customAttribute('file-upload')
@autoinject()
export class FileUpload {

  @bindable({defaultBindingMode: bindingMode.oneTime, defaultValue: {}})
  options: any;

  @bindable({defaultBindingMode: bindingMode.twoWay, defaultValue: []})
  queue: any[];

  @bindable({defaultBindingMode: bindingMode.twoWay, defaultValue: 0})
  progress: number;

  @bindable fileAddCallback;
  @bindable scope;

  @bindable({defaultBindingMode: bindingMode.twoWay})
  destroy: Function;

  fileUploadService: FileUploadService;

  constructor(private element: Element, fileUploadService: FileUploadService) {
    this.element = element;
    this.fileUploadService = fileUploadService;
  }

  async attached() {

    const files = new Map();
    const $element = $(this.element);
    const progressPercent = (data: any): number => {
      const progress: any = data.loaded / data.total * 100;
      return parseInt(progress, 10);
    };
    const updateQueue = () => this.queue = Array.from(files.values());
    const updateFile = (id, file) => {
      files.set(id, file);
      updateQueue();
    };
    this.destroy = async(id, deleteUrl) => {
      await this.fileUploadService.deleteFile(deleteUrl);
      files.delete(id);
      updateQueue();
    };

    // TODO
    const endpointUrl: string = ''; // await this.configuration.getApiEndpointUrl();

    /**
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Chunked-file-uploads
     */

    const beforeSend = (xhr) => {
      // xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    };

    // Resuming file uploads
    const add = async(e, data) => {
      const response = await this.fileUploadService.addFile(data.files[0].name);
      const file = response.file;
      data.files[0].id = file.id;
      data.files[0].aliasName = file.aliasName;
      data.files[0].fileType = file.name.split('.').pop();
      files.set(file.id, data.files[0]);
      updateQueue();
      if (typeof this.fileAddCallback === 'function') {
        this.fileAddCallback.apply(this.scope, [data.files[0]]);
      }
      data.uploadedBytes = file && file.size;
      $.blueimp.fileupload.prototype.options.add.call(this.element, e, data);
    };

    // Automatic resume
    const fail = (e, data) => {

      // jQuery Widget Factory uses "namespace-widgetname" since version 1.10.0:
      const fu = $element.data('blueimp-fileupload') || $element.data('fileupload');
      let retries = data.context.data('retries') || 0;

      const retry = () => {
        this.fileUploadService.retryFile(data.files[0].name, data.files[0].id)
          .then(result => {
            const file = result.file;
            data.uploadedBytes = file && file.size;
            // clear the previous data:
            data.data = null;
            data.submit();
          }).catch(() => {
          fu._trigger('fail', e, data);
        })
      };

      if ((data.errorThrown !== 'abort') &&
        (data.uploadedBytes < data.files[0].size) &&
        (retries < fu.options.maxRetries)) {
        retries += 1;
        data.context.data('retries', retries);
        window.setTimeout(retry, retries * fu.options.retryTimeout);
        return;
      }
      data.context.removeData('retries');
      $.blueimp.fileupload.prototype.options.fail.call(this.element, e, data);
    };

    const submit = (e, data) => {
      data.formData = {id: data.files[0].id};
      return true;
    };

    const options = {
      url: `${endpointUrl}/file/upload/`,
      autoUpload: true,
      maxChunkSize: 10000000, // 10 MB
      maxRetries: 100,
      retryTimeout: 5000,
      beforeSend: beforeSend,
      add: add,
      fail: fail,
      submit: submit
    };
    $.extend(options, this.options || {});

    $element.fileupload(options).on('fileuploadprogress', (e, data) => {
      const file = data.files[0];
      files.get(file.id).progress = progressPercent(data);
      updateQueue();
    }).on('fileuploadprogressall', (e, data) => {
      this.progress = progressPercent(data);
    }).on('fileuploaddone', (e, data) => {
      const result = data.result;
      const file = data.files[0];
      const srcFile = files.get(file.id);
      srcFile.url = result.files[0].url;
      srcFile.deleteUrl = result.files[0].deleteUrl;
      updateQueue();
    });

  }

  detached() {
    $(this.element).fileupload('destroy');
  }

}


