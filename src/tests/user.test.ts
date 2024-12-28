import request from 'supertest';
import app from '../server';
import sequelize from '../models';
import express, { Application } from 'express'
import userRoutes from '../routes/UserRoutes';
import { errorHandler } from "../middleware/errorHandler";

let server: Application;

describe("User API Tests", () => {

  beforeAll(async () => {
    server = express();
    server.use(express.json());
    server.use("/users", userRoutes);
    server.use(errorHandler);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  
  afterEach(async () => {
    await sequelize.close();
  });

  const testUser = {
    name: "Test User",
    email: "testuser@example.com",
    message: "test message",
  };
  
  it("should create a user", async () => {

    const response = await request(app)
      .post("/users")
      .send(testUser);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(testUser.name);
    expect(response.body.email).toBe(testUser.email);
    expect(response.body.message).toBe(testUser.message);
  });

  it("should get all users", async () => {
    const response = await request(server).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should get a user by ID", async () => {
    const createdUser = await request(server)
      .post("/users")
      .send(testUser);
    
    const response = await request(server).get(`/users/${createdUser.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdUser.body.id);
  });

it("should update user with partial data", async () => {
  const createdUser = await request(server)
    .post("/users")
    .send(testUser);

  const response = await request(server)
    .put(`/users/${createdUser.body.id}`)
    .send({ name: "Partial Update" });

  expect(response.status).toBe(200);
  expect(response.body.name).toBe("Partial Update");
  expect(response.body.email).toBe(testUser.email); 
});
  it("should delete a user", async () => {
    const createdUser = await request(server)
      .post("/users")
      .send(testUser);
    
    const deleteResponse = await request(server).delete(`/users/${createdUser.body.id}`);
    expect(deleteResponse.status).toBe(204);
  });
});

describe("Error Handling Tests", () => {
  it("should return 404 for non-existent user", async () => {
    const response = await request(app).get("/users/999999");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "User not found");
  });

  it("should return 400 for invalid user data", async () => {
  const invalidUser = { name: "", email: "invalid", message: "" };

  const response = await request(server)
    .post("/users")
    .send(invalidUser);

  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("errors");
});
});
