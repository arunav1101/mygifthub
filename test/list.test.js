const chai = require('chai')
const chaiHttp = require('chai-http');

// var expect = require("chai").expect;
const expect = chai.expect;
chai.use(chaiHttp);


pathUrl = 'http://localhost:3000/'

const dataStore = {
  userId: null,
  listId:null
}
describe.skip("Validate list Api test", () => {
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

  it("should get the details of created List", () => chai.request(pathUrl)
  .get(`api/list/${dataStore.listId}`)
  .then((res) => {
    expect(res).status(200);
    expect(res.body.ListName).to.equal('Test');
    expect(res.body.GoogleID).to.equal('Test11');
    expect(res.body.UserId).to.equal(dataStore.userId);
  })
)
});