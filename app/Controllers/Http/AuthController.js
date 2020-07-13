'use strict'

const { attempt } = require("lodash")

class AuthController {
    async login ({ request, response, auth }) {
        const { email, password } = request.all()
        const resp = await auth.attempt(email, password)
        return resp
    }
}

module.exports = AuthController
