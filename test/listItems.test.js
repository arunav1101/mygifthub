'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

const pathUrl = 'http://localhost:3000/'

const dataStore = {
  userId: null,
  listId: null,
  listItemsDetails:null,
  listItemId:null
}

describe("Validate listItems Api test", () => {
  it("should create new user", () => chai.request(pathUrl)
    .post('api/users')
    .send({
      GoogleID: "test",
      emailAddress: "a@a.com",
      firstName: "test",
      lastName: "test",
      photo: "test"
    }).then((res) => {
      expect(res).status(200);
      console.log('user',res.body)
      dataStore.userId = res.body.id
    })
  )

  it("should create new List", () => chai.request(pathUrl)
    .post(`api/list/${dataStore.userId}`)
    .send({
      GoogleID: 'Test11',
      ListName: 'Test'
    }).then((res) => {
      expect(res).status(200);
      dataStore.listId = res.body.id;
    })
  )


  it("should create new ListItems", () => chai.request(pathUrl)
    .post(`api/listItems/${dataStore.listId}`)
    .send({
      title: "req.body.title",
      url: "https://api.shop.com:8443/stores/v1/products",
      imgUrl: "https://api.shop.com:8443/stores/v1/products",
      price: "3.00",
      notes: "req.body.notes"
    }).then((res) => {
      expect(res).status(200);
      dataStore.listItemId = res.body.id;
    })
  )

  it("should get the details of created Listitems", () => chai.request(pathUrl)
    .get(`api/listitems`)
    .then((res) => {
      expect(res).status(200);
    })
  )
});