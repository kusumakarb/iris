export class DataConverters{

  lineChartDataGenerator(irisData){
    const petalLengthArray = [];
    const petalWidthArray = [];
    const sepalLengthArray = [];
    const sepalWidthArray = [];

    irisData.forEach((irisObject) => {
      Object.keys(irisObject).forEach((key ,index) => {
        index == 0 && petalLengthArray.push(irisObject[key]);
        index == 1 && petalWidthArray.push(irisObject[key]);
        index == 2 && sepalLengthArray.push(irisObject[key]);
        index == 3 && sepalWidthArray.push(irisObject[key]);
      });
    });

    return {
      petalLengthArray,
      petalWidthArray,
      sepalLengthArray,
      sepalWidthArray
    }
  }


  getArrayOfValues(arrayOfObjects: Object[], searchValue: string){
    return arrayOfObjects.map((arrayObject) => arrayObject[searchValue]);
  }


  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }



}
