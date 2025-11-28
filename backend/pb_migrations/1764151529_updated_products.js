/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select4282022807",
    "maxSelect": 12,
    "name": "Category",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Ветеринария",
      "Сухой корм",
      "Влажный корм",
      "Аксессуары",
      "Гигиена",
      "Здоровье",
      "Лакомство",
      "Наполнитель",
      "Одежда и обувь",
      "Для грызунов",
      "Для птиц",
      "для рыб и рептилий"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update field
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
      "Ветеринария",
      "Сухой корм",
      "Влажный корм",
      "Аксессуары",
      "Гигиена",
      "Здоровье",
      "Лакомство",
      "Наполнитель",
      "Одежда и обувь",
      "Для грызунов",
      "Для птиц",
      "для рыб и рептилий"
    ]
  }))

  return app.save(collection)
})
