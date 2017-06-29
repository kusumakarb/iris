export class FileSizeValueConverter {

  // Byte units following the IEC format
  // http://en.wikipedia.org/wiki/Kilobyte
  units = [
    {size: 1000000000, suffix: ' GB'},
    {size: 1000000, suffix: ' MB'},
    {size: 1000, suffix: ' KB'}
  ];

  toView(bytes) {
    if (typeof bytes !== 'number') {
      return '';
    }
    for (let i = 0, unit: any = true; unit; i++) {
      unit = this.units[i];
      const suffix = unit.suffix || '';
      if (i == this.units.length - 1 || bytes >= unit.size) {
        return (bytes / unit.size).toFixed(2) + suffix;
      }
    }
  }
}
