require('module-alias/register')
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const sinon = require('sinon');
const app = require('@root/app')

chai.use(chaiHttp)


describe('Checkout', () => {
    const url = '/api/checkout'

    describe(`POST ${url}`, () => {
        it('Macbook Pro Free Rasberry Pi', (done) => {
            const data = [
                
            ];
            chai.request(app)
                .post(url)
                .send({
                    orders: data,
                })
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    sinon.restore()
                    done()
                })
        })

        it('Macbook Pro Free Rasberry Pi', (done) => {
            const data = [
                {
                    sku: 'SKU00002',
                    qty:1
                },
                {
                    sku: 'SKU00004',
                    qty:1
                }
            ];
            chai.request(app)
                .post(url)
                .send({
                    orders: data,
                })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body.data.total).equal(5399.99)
                    expect(res.body.data.total_discount).equal(30)
                    sinon.restore()
                    done()
                })
        })

        it('three google home promo', (done) => {
            const data = [
                {
                    sku: 'SKU00001',
                    qty:3
                }
            ];
            chai.request(app)
                .post(url)
                .send({
                    orders: data,
                })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body.data.total).equal(99.8)
                    expect(res.body.data.total_discount).equal(49.9)
                    sinon.restore()
                    done()
                })
        })

        it('three Alexa Speaker promo', (done) => {
            const data = [
                {
                    sku: 'SKU00003',
                    qty:3
                }
            ];
            chai.request(app)
                .post(url)
                .send({
                    orders: data,
                    id: 1
                })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body.data.total).equal(295.65)
                    expect(res.body.data.total_discount).equal(32.85)
                    sinon.restore()
                    done()
                })
        })

    });
});
