import request from "supertest";
import app from "../../src/app";
import * as db from "../../src/db";

describe("Router", () => {

  beforeAll(async () => await db.connect());

  afterEach(async () => await db.clearDatabase());

  afterAll(async () => await db.closeDatabase());

  it("GET /api/items", done => {
    request(app)
      .get("/api/items")
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
        done();
      });
  });
});
