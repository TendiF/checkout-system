const DBConnection = require('@utils/database')

class CheckoutRuleModel {
    constructor(){
        this.dbConnection = new DBConnection()
        this.table = 'checkout_rules'
    }

    async getRulesBySKU(sku){
        const query = `SELECT * FROM ${this.table} WHERE sku = ? `
        return  await this.dbConnection.query(query, [sku])
    }

}

module.exports = CheckoutRuleModel