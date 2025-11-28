/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select4282022807",
    "maxSelect": 1,
    "name": "Category",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Ветеринария"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // remove field
  collection.fields.removeById("select4282022807")

  return app.save(collection)
})
