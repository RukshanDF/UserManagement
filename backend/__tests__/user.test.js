const express = require("express");
const request = require("supertest");
const { app } = require("../server");

beforeAll(() => {
  server = app.listen(9000);
});

const userInput = {
  email: "test@example.com",
  name: "Jane Doe",
  status: "Active",
};

describe("users creation", () => {
  it("should create an user", () => {
    return request(app).post("/users").send(userInput).expect(201);
  }, 30000);
});

describe("users delete", () => {
  it("should delete the user", () => {
    return request(app)
      .delete("/users/deleteByMail")
      .send(userInput)
      .expect(200);
  }, 30000);
});

describe("users validations", () => {
  it("should return users", () => {
    return request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => expect(typeof res.body[0].name).toBe("string"))
      .expect((res) => expect(typeof res.body[0].date).toBe("string"))
      .expect((res) => expect(typeof res.body[0].status).toBe("string"))
      .expect((res) => expect(typeof res.body[0].email).toBe("string"));
  });
  it("should return unique user creation date", () => {
    return request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) =>
        expect(
          res.body[res.body.length - 2].date ===
            res.body[res.body.length - 1].date
        ).toBe(false)
      );
  });

  it("should return correct user status Active, Non-Active, Lead", () => {
    return request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) =>
        expect(
          res.body[1].status === "Active" ||
            res.body[1].status === "Non-Active" ||
            res.body[1].status === "Lead"
        ).toBe(true)
      );
  });
});

afterAll(() => {
  server.close();
});
