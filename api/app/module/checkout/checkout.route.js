var CheckoutController = require('./checkout.controller')

module.exports = (app) => {
  const checkoutController = new CheckoutController()
  app
    .route('/checkout')
    .post(checkoutController.sendCheckout)

};
