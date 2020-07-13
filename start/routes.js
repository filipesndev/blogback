'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/admin/users', 'UserController.store')

Route.get('/posts', 'PostController.index')
Route.get('/posts/:id', 'PostController.show')
Route.get('/posts/images/:filename', 'PostController.showImg')

Route.post('/login', 'AuthController.login')

Route.group(() => {
  Route.get('/admin/categories', 'CategoryController.index')
  Route.post('/admin/categories', 'CategoryController.store')
  Route.delete('/admin/categories/:id', 'CategoryController.destroy')

  Route.get('/admin/users', 'UserController.index')
  Route.delete('/admin/users/:id', 'UserController.destroy')

  Route.post('/admin/posts/:id/images', 'PostController.upload' )
  Route.post('/admin/posts', 'PostController.store')
  Route.delete('/admin/posts/:id', 'PostController.destroy')
  Route.put('/admin/posts/:id', 'PostController.update')
}).middleware('auth')