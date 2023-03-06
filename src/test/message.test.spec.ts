import chai, { use } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "node:test";
import app from "../app";

chai.should();
chai.use(chaiHttp);

describe("Testing all message routes", () => {
  //testing sending route with data
  describe("testing message sending route", () => {
    let sendMsg = {
      eventName: "chat",
      message: "Hi, from this side",
      userName: "Puja",
    };

    it("Receives messages", (done) => {
      chai
        .request(app)
        .post("/api/sendMessage")
        .send(sendMsg)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  //testing message receiving route with data
  describe("testing message receiving route", () => {
    let receiveMsg = {
      eventName: "chat",
    };
    it("Receives messages", (done) => {
      chai
        .request(app)
        .post("/api/recieveMessage")
        .send(receiveMsg)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  //testing for wrong entry
  describe("testing get route for wrong entry", () => {
    it("get bad request", (done) => {
      chai
        .request(app)
        .get("/erhreo")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  //testing without data
  describe("testing post route without data", () => {
    it("do not send message", (done) => {
      chai
        .request(app)
        .post("/api/sendMessage")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
