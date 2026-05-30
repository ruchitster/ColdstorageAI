import request from "supertest";
import app from "../app.js";

describe("Backend API", () => {

  test("GET / should work", async () => {

    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);

    expect(res.text).toBe("Cold Storage Backend Running");

  });

});