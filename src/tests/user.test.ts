import request from 'supertest';
import app from '../server';

describe("User API Tests", () => {

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
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should get a user by ID", async () => {
    const createdUser = await request(app)
      .post("/users")
      .send(testUser);
    
    const response = await request(app).get(`/users/${createdUser.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdUser.body.id);
  });

  it("should update user", async () => {

    const updatedUser = {
      name: "Updated User",
      email: "updateduser@example.com",
      message: "updated message",
    };

    const createdUser = await request(app)
      .post("/users")
      .send(testUser);
    
    const response = await request(app)
      .put(`/users/${createdUser.body.id}`)
      .send();
    
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);
    expect(response.body.email).toBe(updatedUser.email);
    expect(response.body.message).toBe(updatedUser.message);
  });

  it("should delete a user", async () => {
    const createdUser = await request(app)
      .post("/users")
      .send(testUser);
    
    const deleteResponse = await request(app).delete(`/users/${createdUser.body.id}`);
    expect(deleteResponse.status).toBe(204);
  });
});

describe("Error Handling Tests", () => {
  it("should return 404 for non-existent user", async () => {
    const response = await request(app).get("/users/999999");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "User not found");
  });
});