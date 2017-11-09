interface QueryWhere {
  selector: string
  value: any
  comp: string
}

namespace Objecor {

  export class ObjectorQueryObject extends ObjectorObject {

    private _where: QueryWhere[] = []

    public select(...selectors: string[]): ObjectorObject {
      let results: any = []
      if (Array.isArray(this.object)) {
        this.object.forEach(obj => {
          let o = objector(obj)
          if (selectors) {
            let obj: any = {}
            selectors.forEach(selector => {
              let parts = this._selectorParts(selector)
              let lp = obj
              parts.forEach(part => { lp = lp[part] = o.sub(selector).object })
            })
            results.push(obj)
          } else {
            results.push(o.object)
          }
        })
      }
      return new ObjectorQueryObject(results)
    }

    public first(selector?: string) {
      // let results = this.select(selector)
      return new ObjectorQueryObject(this.object[0])
    }

    public firstOrDefault(def: any) {
      if (this.object && Array.isArray(this.object) && this.object.length > 0) {
        return new ObjectorQueryObject(this.object[0])
      }
      return new ObjectorQueryObject(def)
    }

    public where(filter: any): ObjectorQueryObject
    public where(selector: string, filter: any): ObjectorQueryObject
    public where(...args: any[]): ObjectorQueryObject {
      let values: any = [], obj: ObjectorObject | undefined
      let filter: any
      if (args.length == 1) {
        obj = this
        filter = args[0]
      } else if (args.length == 2) {
        obj = this.sub(args[0])
        filter = args[1]
      }
      if (obj && obj.object instanceof Array) {
        values = obj.object.filter(filter)
      }
      return new ObjectorQueryObject(values)
    }

  }

}