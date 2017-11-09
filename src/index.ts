declare namespace Objector { }
declare var module: any
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Objecor
} else {
  (<any>window).objector = objector
}