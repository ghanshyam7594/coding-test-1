var app = require('../Post-API')
var chai = require('chai')
var request = require('supertest');
var expect=chai.expect;

describe("Simple tests on post",()=>{
    it("Testing if values are replaced properly",async ()=>{
        const input={
          "payload": {
            "name": "subscriber",
            "valueType": "array",
            "value": [
              {
                "name": "MN",
                "valueType": "string",
                "value": "{REF_MSISDN}"
              },
              {
                "name": "IM",
                "valueType": "string",
                "value": "{REF_IMSI}"
              },
              {
                "name": "NT",
                "valueType": "string",
                "value": "{REF_SERVPROFID}"
              }
            ]
          },
          "referenceData": {
            "REF_MSISDN": "0406679321",
            "REF_IMSI": "50002312344314",
            "REF_SERVPROFID": "2"
          }
        }
        const res= await request(app).post("/post").send(input);
        
        expect(res.status).to.equal(200);
        expect(JSON.stringify(res.body).match(/REF/g)).to.equal(null);
        expect(res.body.value[0].value).to.equal("0406679321");
        expect(res.body.value[1].value).to.equal("50002312344314");
        expect(res.body.value[2].value).to.equal("2");
                            
    })
})
