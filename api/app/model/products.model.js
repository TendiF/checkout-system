const DBConnection = require('@utils/database')

class ProductsModel {
    constructor(){
        this.dbConnection = new DBConnection()
        this.table = 'products'
    }

    async getProductBySKU(sku){
        const query = `SELECT * FROM ${this.table} WHERE sku = ? `
        const result = await this.dbConnection.query(query, [sku])
        return result
    }

}

module.exports = ProductsModel