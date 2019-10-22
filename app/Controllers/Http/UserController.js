'use strict'

const User = use('App/Models/User');

class UserController {
  async store({request, _response}) {  //contexto da requisição
    const data = request.only(['username', 'email', 'password']);

    const user = await User.create(data);

    return user;
  }
}

module.exports = UserController
