function objector(object: any) {
  return new Objecor.ObjectorObject(object)
}

namespace Objecor {

  declare var module: any

  export enum type { array, object, string, boolean, date, number }

  export class ObjectorObject {

    private _rootObject: any
    protected _stepDebug: boolean = false

    public get object(): any { return this._rootObject }
    public get query(): ObjectorQueryObject {
      if (this instanceof ObjectorQueryObject) {
        return this
      }
      return new ObjectorQueryObject(this._rootObject)
    }

    public constructor(object: Object) {
      this._rootObject = object
    }

    public sub(selector: string): ObjectorObject {
      return new ObjectorObject(this._reduce(selector))
    }

    public add(...items: any[]): this {
      this._add(this._rootObject, ...items)
      return this
    }

    public addTo(selector: string, ...items: any[]) {
      let newitems = this._add(this.sub(selector).object, ...items)
      return this
    }

    private _add(object: any, ...items: any[]) {
      if (Array.isArray(object)) {
        object.push(...items)
      } else if (object instanceof Object) {
        items.forEach(item => {
          object = Object.assign(object, items)
        })
      }
      return object
    }

    private _reduce(selector: string) {
      return this._selectorParts(selector)
        .reduce((o, i) => o[i], this._rootObject)
    }

    protected _selectorParts(selector: string): string[] {
      let parts: string[] = []
      selector.trim().split('.').forEach(item => {
        item.split('[').filter(n => n && n.length > 0).forEach(item => {
          parts.push(item.replace(/\]/g, '').trim())
        })
      })
      return parts
    }

    public debug(): this {
      console.log(this.object)
      return this
    }

  }
}