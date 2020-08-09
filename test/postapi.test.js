const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../postapi');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('Simple Test', () => {
  it('expected the value should be changed', async () => {
    const user = {
      "payload": {
        "name": "subscriber",
        "valueType": "array",
        "value": "{REF_MSISDN}"
        
        },
        "referenceData": {
          "REF_MSISDN": "0406679321",
          "REF_IMSI": "50002312344314",
          "REF_SERVPROFID": "2"
        }
      
    };
    const res = await request(app).post('/').send(user);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.value).to.equal("0406679321");
  })
});