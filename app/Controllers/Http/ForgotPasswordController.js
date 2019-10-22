"use strict";

const crypto = require("crypto");

const User = use("App/Models/User");

const Mail = use("Mail");

class ForgotPasswordController {
  async store({ response, request }) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      user.token = crypto.randomBytes(20).toString("hex");
      user.token_created_at = new Date();

      await user.save();

      await Mail.send(['emails.forgot_password'], {email: user.email, link: `${request.input('redirect_url')}?token=${user.token}`}, (message) => {
        message
          .to(user.email)
          .from('<from-email>')
          .subject('Welcome to yardstick')
      })
    } catch (err) {
      return response.status(err.status).send({
        error: { message: "Algo não deu certo, esse e-mail existe? " }
      });
    }
  }
}

module.exports = ForgotPasswordController;
