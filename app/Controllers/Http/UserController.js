'use strict'
const User = use('App/Models/User')
class UserController {

    async index ({ request, response, view }) {
        return await User.all()
    }

    async store ({ request, response }) {
        const data = request.only(['username', 'email', 'password', 'is_admin'])
        const user = await User.create(data)
        return user
    }

    async destroy ({ params, request, response }) {
        const user = await User.findOrFail(params.id)
        await user.delete()
        return {
          message: 'Usuario deletado com sucesso' 
        }
    }
    
}

module.exports = UserController
