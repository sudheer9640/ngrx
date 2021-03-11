export class CommonUtilities {
  static nestedClone = (obj) => {
    if (null == obj || 'object' != typeof obj) return obj;
    // Handle Object
    if (obj instanceof Object) {
      const copy = {};
      for (const attr in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, attr)) {
          copy[attr] = CommonUtilities.nestedClone(obj[attr]);
        }
      }
      return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
      const copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = CommonUtilities.nestedClone(obj[i]);
      }
      return copy;
    }
    // Handle Date
    if (obj instanceof Date) {
      const copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    throw new Error('Unable to copy obj! Its type isn"t supported.');
  };

  // static isInt(n) {
  //   return Number(n) === n && n % 1 === 0;
  // }
}
