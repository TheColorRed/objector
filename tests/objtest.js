let obj = objector({
  items: [
    {
      name: 'Jim',
      age: 123,
      colors: {
        primary: 'white',
        secondary: 'black'
      }
    },
    {
      name: 'Jim',
      age: 456,
      colors: {
        primary: 'white',
        secondary: 'gray'
      }
    }
  ]
})

obj
  .addTo('items', { name: 'Billy' })
  .query.where('items', i => i.name == 'Jim')
  .select('name', 'age', 'colors').debug()
  // .first().debug()
  // .firstOrDefault({ primary: 'red' }).debug()

// let items = obj.query.where(obj => obj.name == 'Jim').select('colors.secondary')

// console.log(obj.sub('items[1]'))
// console.log(items.object)