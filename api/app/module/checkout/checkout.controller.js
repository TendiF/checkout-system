const ProductsModel = require('@model/products.model')
const CheckoutRuleModel = require('@model/checkout.rules.model')

class CheckoutController
 {
    constructor () {
      this.sendCheckout = this.sendCheckout.bind(this)
      this.productsModel = new ProductsModel()
      this.checkoutRuleModel = new CheckoutRuleModel()
    }
    
    async sendCheckout (req, res) {
      let { orders } = req.body
      let result = {
        total : 0,
        total_discount: 0
      }

      if(!orders || orders.length == 0){
        return res.sendError([], 'invalid value')
      }
      
      //check total
      for (const val of orders) {
        let data = await this.productsModel.getProductBySKU(val.sku)
        if(!data.data.length){
          return res.sendError([], 'invalid data:product not found')
        }

        val.price = data.data[0].price

        result.total += val.price * val.qty
      }

      //check rule promotion
      for (const val of orders) {
        let data = await this.checkoutRuleModel.getRulesBySKU(val.sku)
        if(data && data.data[0]){
          let rule = data.data[0]
          if(rule.type == 'free_product'){
            let productInCheckout = orders.filter(v => v.sku == rule.value)
            if(productInCheckout.length && val.qty >= rule.min_qty){
              result.total_discount += productInCheckout[0].price
              result.total -= productInCheckout[0].price
            }
          }

          if(rule.type == 'dicount'){
            if(val.qty >= rule.min_qty){
              result.total_discount += (result.total / 100 * rule.value)
              result.total -= (result.total / 100 * rule.value)
            }
          }
        }
      }

      if (result) {
        return res.sendSuccess(result)
      } else {
        return res.sendError(result.errors)
      }
      
    }

}

module.exports = CheckoutController

