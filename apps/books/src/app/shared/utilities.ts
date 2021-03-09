export class Utilities {

  static nestedClone = (obj) => {
    if (null == obj || 'object' != typeof obj) return obj;
    // Handle Array
    if (obj instanceof Array) {
      var copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = Utilities.nestedClone(obj[i]);
      }
      return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
      const copy = {};
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = Utilities.nestedClone(obj[attr]);
      }
      return copy;
    }
    // Handle Date
    if (obj instanceof Date) {
      let copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    throw new Error('Unable to copy obj! Its type isn\'t supported.');
  };

  static isInt(n) {
    if (Number(n) === n && n % 1 === 0) {
      return true;
    }
    return false
  }
}
