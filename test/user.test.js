const chai = require('chai')
const chaiHttp = require('chai-http');

// var expect = require("chai").expect;
const expect = chai.expect;
chai.use(chaiHttp);


pathUrl = 'http://localhost:3000/'

const dataStore = {
  userId: null
}
describe.skip("Validate User Api test", ()=> {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it(" should create new User", () => chai.request(pathUrl)
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
  );


  it("shoudl get new user details", () => chai.request(pathUrl)
    .get(`api/users/${dataStore.userId}`)
    .then((res) => {
      expect(res).status(200);
      expect(res.body.GoogleID).to.equal('test');
      expect(res.body.emailAddress).to.equal('a@a.com');
      expect(res.body.firstName).to.equal('test');
      expect(res.body.lastName).to.equal('test');
      expect(res.body.photo).to.equal('test');
    })
  )

});