import request from "supertest";
import app from "../app.js";

describe("Protected Route Testing", () => {

  let token = "";



  // ✅ GET TOKEN BEFORE TESTS
  beforeAll(async () => {

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        username: "admin",
        password: "admin123"
      });

    token = res.body.token;

  });



  // ✅ VALID TOKEN
  test("GET /api/protected should work with valid token", async () => {

    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

  });



  // ❌ NO TOKEN
  test("GET /api/protected should fail without token", async () => {

    const res = await request(app)
      .get("/api/protected");

    expect(res.statusCode).toBe(401);

    expect(res.body.message).toBe("No token provided");

  });



  // ❌ INVALID TOKEN
  test("GET /api/protected should fail with invalid token", async () => {

    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", "Bearer invalidtoken123");

    expect(res.statusCode).toBe(401);

    expect(res.body.message).toBe("Invalid token");

  });

});