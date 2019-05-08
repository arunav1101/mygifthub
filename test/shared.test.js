const chai = require('chai')
const chaiHttp = require('chai-http');

// var expect = require("chai").expect;
const expect = chai.expect;
chai.use(chaiHttp);

const PORT = process.env.PORT || 3000;
pathUrl = `http://localhost:${PORT}/`;

const dataStore = {
  userId: null,
  listId: null,
  userId2: null,
  listId2: null,
  list1Details: null,
  listSharedDetails: null
}
describe("Validate Shared Api test", () => {
  it("should create new user 1", () => chai.request(pathUrl)
    .post('api/users')
    .send({
      GoogleID: "user1",
      emailAddress: "a@a.com",
      firstName: "test",
      lastName: "test",
      photo: "test"
    }).then((res) => {
      expect(res).status(200);
      dataStore.userId = res.body.id
    })
  )

  it("should create new user 2", () => chai.request(pathUrl)
    .post('api/users')
    .send({
      GoogleID: "user2",
      emailAddress: "a@a.com",
      firstName: "test",
      lastName: "test",
      photo: "test"
    }).then((res) => {
      expect(res).status(200);
      dataStore.userId2 = res.body.id
    })
  )

  it("should create new List by user1", () => chai.request(pathUrl)
    .post(`api/list/${dataStore.userId}`)
    .send({
      GoogleID: 'user1',
      ListName: 'Test'
    }).then((res) => {
      expect(res).status(200);
      dataStore.listId = res.body.id;
      console.log('list1', res.body)
      dataStore.list1Details = res.body;
    })
  )


  it("should create new List by user2", () => chai.request(pathUrl)
    .post(`api/list/${dataStore.userId2}`)
    .send({
      GoogleID: 'user2',
      ListName: 'Test'
    }).then((res) => {
      expect(res).status(200);
      dataStore.listId2 = res.body.id;

    })
  )


  it("user 2 Shared the list to user 1", () => chai.request(pathUrl)
    .post(`api/shared/${dataStore.listId2}`)
    .send({
      sharedTo: dataStore.userId
    }).then((res) => {
      expect(res).status(200);
      dataStore.listSharedDetails = res.body;
    })
  )

  it("should get the details of created List", () => chai.request(pathUrl)
    .get(`api/users/${dataStore.userId}`)
    .then((res) => {
      expect(res).status(200);
      console.log(res.body)
      expect(res.body[0].GoogleID).to.equal('user1');
      expect(res.body[0].emailAddress).to.equal('a@a.com');
      expect(res.body[0].firstName).to.equal('test');
      expect(res.body[0].lastName).to.equal('test');
      expect(res.body[0].photo).to.equal('test');
      expect(res.body[0].createdAt).to.exist;
      expect(res.body[0].updatedAt).to.exist;
      expect(res.body[0].Lists[0]).to.not.empty;
      expect(res.body[0].Lists[0].UserId).to.equal(dataStore.userId);
      expect(res.body[0].Lists[0].id).to.equal(dataStore.listId);
      expect(res.body[0].Shareds[0]).to.not.empty;
      expect(res.body[0].Shareds[0].ListId).to.equal(`${dataStore.listId2}`);

    })
  )
});