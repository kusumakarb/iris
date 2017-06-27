interface ObjectKeyValue {
  key: string;
  value: any;
}

export class ObjectIteratorValueConverter {

  toView(obj) {

    let temp: ObjectKeyValue[] = [];

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        temp.push({key: key, value: obj[key]});
      }
    }

    return temp;
  }
}
