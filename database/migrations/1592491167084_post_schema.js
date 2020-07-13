'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('title', 254).notNullable()
      table.text('description').notNullable()
      table.string('banner', 254)
      table.string('minibanner', 254)
      table.text('content').notNullable()
      table.integer('category_id').unsigned().references('categories.id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
