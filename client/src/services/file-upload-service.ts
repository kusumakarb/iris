import {inject} from 'aurelia-framework';
import {Endpoint, Rest} from 'aurelia-api';
import {Constants} from '../config/constants';

@inject(Endpoint.of('api'))
export class FileUploadService {

  apiEndPoint: Rest;

  constructor(apiEndpoint) {
    this.apiEndPoint = apiEndpoint;
  }

  async addFile(fileName: string): Promise<any> {
    fileName = encodeURIComponent(fileName);
    return this.apiEndPoint.find(`/file/upload/${fileName}`);
  }

  async retryFile(fileName: string, id: string): Promise<any> {
    fileName = encodeURIComponent(fileName);
    id = encodeURIComponent(id);
    return this.apiEndPoint.find(`/file/retry/${fileName}/${id}`);
  }

  async deleteFile(deleteUrl: string): Promise<any> {
    return this.apiEndPoint.destroy(deleteUrl);
  }

}
