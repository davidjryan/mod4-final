process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");
const knex = require("../db/knex");
chai.use(chaiHttp);

describe("Client Routes", () => {
  it("should return the homepage", () => {
    return chai
      .request(server)
      .get("/")
      .then(response => {
        response.should.have.status(200);
        response.should.be.html;
      })
      .catch(error => {
        throw error;
      });
  });

  it("should return a 404 if the page is not found", () => {
    return chai
      .request(server)
      .get("/sad")
      .then(response => {
        response.should.have.status(404);
      });
  });
});

describe("API Routes", () => {
  beforeEach(done => {
    knex.seed.run().then(() => {
      done();
    });
  });

  describe("GET api/v1/mod4final", () => {
    it("should return all the cards", () => {
      return chai
        .request(server)
        .get("/api/v1/mod4final")
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a("array");
          response.body.length.should.equal(3);
          response.res.should.be.a("object");
          response.body[0].should.have.property("title");
          response.body[0].title.should.equal("Do");
        })
        .catch(err => {
          throw err;
        });
    });
  });

  describe("POST api/v1/mod4final", () => {
    it("should post a card", () => {
      return chai
        .request(server)
        .post("/api/v1/mod4final")
        .send({
          test: "Do the thing"
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
        })
        .catch(error => {
          throw error;
        });
    });

    it("should return a 422 when a required param is missing", () => {
      return chai
        .request(server)
        .post("/api/v1/mod4final")
        .send({
          notTitle: "fake title"
        })
        .then(response => {
          response.should.have.status(422);
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('DELETE api/v1/mod4final', () => {
    let cardToDelete;
    beforeEach( done => {
      knex('mod4final').first().then(card => {
        cardToDelete = card
        done()
      })
    })

    it('should delete a card', () => {
      return chai.request(server)
      .delete(`/api/v1/mod4final/${cardToDelete.id}`)
      then(response => {
        response.should.have.status(204)
      })
      .catch(error => {
        throw error;
      })
    })
})
})
