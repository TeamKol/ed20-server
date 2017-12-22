const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const model = require('../model');
var should = chai.should();
var User = model.userServer
chai.use(chaiHttp);

describe('/ GET',function(){
    it('should list ALL blobs on /blobs GET',function(done){
        chai.request('http://localhost:3000')
            .get('/')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();                               // <= Call done to signal callback end
            });
    });
});
describe('User', function () {
  describe('signUp test', function () {
      it('should create user', function (done) {
        chai.request('http://localhost:3000')
        .post('/signup')
        .set('content-type', 'application/json')
        .send({email:'user@user.com',password:'pass11',username:'user'})
        .end(function(err, res){
            res.should.redirectTo('http://localhost:3000/');
            res.should.have.status(200);
            done();
        });
      });
  });

  describe('Login test', function () {
      it('should redirect to /', function (done) {
        chai.request('http://localhost:3000')
        .post('/login')
        .set('content-type', 'application/json')
        .send({email:'user@user.com',password:'pass11'})
        .end(function(err, res){
            res.should.redirectTo('http://localhost:3000/');
            res.should.have.status(200);
            done();
        });
      });

  
});
after(function(done) {
      User.remove().exec();
      return done();
    });

});