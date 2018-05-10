const application = require('../application');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('sign up', () => {

  let app = null;
  let client = null;

  before(async () => {

    app = application.instance();

  });

  after(async () => {

    app = null;

  });

  it('should return user data for successful sign up.', done => {

    const user = {
      "email"      : "email@domain.net",
      "password"   : "Super Secure Password 4 Site",
      "first_name" : "UserFirstName",
      "last_name"  : "UserLastName"
    };

    chai.request(app.server)
      .post('/api/profiles')
      .send(user)
      .then(res => {

        const { body } = res;
        const actual = body.data;

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(body.message).to.equal('Created');
        expect(actual.email).to.equal(user.email);
        expect(actual.first_name).to.equal(user.first_name);
        expect(actual.last_name).to.equal(user.last_name);

      })
      .catch(done)
    ;

  });

});
