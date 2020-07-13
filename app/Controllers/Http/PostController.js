'use strict'
const Post = use('App/Models/Post')
const Helpers = use('Helpers')
const fs = require('fs')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  
  async index ({ request, response, view }) {
    return await Post.all()
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
    const data = request.only(['title', 'description', 'banner', 'minibanner', 'content', 'category_id'])
    const post = await Post.create(data)
    return post
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const post = await Post.findOrFail(params.id)
    return post
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
    const post = await Post.findOrFail(params.id)
    const newdata = request.only(['title', 'description', 'banner', 'content', 'category_id'])
    await post.merge(newdata)
    await post.save()
    return post
  }

  async destroy ({ params, request, response }) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    return {
      message: 'Post deletado com sucesso' 
    }
  }

  async upload ({request, response, params}) {
    const images = request.file('image', {
      types: ['image'],
      size: '10mb'
    })
  
    await images.moveAll(Helpers.tmpPath('uploads'), (file) => {
      return {
        overwrite: true
      }
    })
  
    if (!images.movedAll()) {
      return images.errors()
    }
    
    const post = await Post.findOrFail(params.id)
    images.movedList().map(
      (file, index) => {
        if(index === 0){
          post.banner = file.fileName
        }else if(index === 1){
          post.minibanner = file.fileName
        }
      }
    )
    await post.save()

    return{
      fileName: images.fileName
    }
  }

  async showImg ({params, request, response}) {
    return response.download(Helpers.tmpPath('uploads/' + params.filename))
  }
}

module.exports = PostController
