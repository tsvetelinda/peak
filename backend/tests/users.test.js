const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('../routes/users');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { AUTH_COOKIE_NAME } = require('../constants');

let app;
let mongoServer;

const JWT_SECRET = 'testsecret';

beforeAll(async () => {
  process.env.JWT_SECRET = JWT_SECRET;

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/users', userRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe('User API', () => {
  const testUserData = {
    firstName: 'Ivan',
    lastName: 'Petrov',
    email: 'ivan@example.com',
    password: 'securepass',
    birthDate: '1990-01-01',
    phone: '0888123456',
    sport: 'Skier',
    skillLevel: 'Beginner'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send(testUserData)
      .expect(200);

    expect(res.body.email).toBe(testUserData.email);
    expect(res.body.firstName).toBe(testUserData.firstName);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should not register with missing fields', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({ email: 'a@b.com' })
      .expect(400);

    expect(res.body.message).toBe('All fields are required!');
  });

  it('should not register an already registered user', async () => {
    await new User(testUserData).save();

    const res = await request(app)
      .post('/users/register')
      .send(testUserData)
      .expect(400);

    expect(res.body.message).toBe('User is already registered!');
  });

  it('should login a registered user', async () => {
    await new User(testUserData).save();

    const res = await request(app)
      .post('/users/login')
      .send({ email: testUserData.email, password: testUserData.password })
      .expect(200);

    expect(res.body.email).toBe(testUserData.email);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should not login with wrong credentials', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ email: 'wrong@example.com', password: 'wrong' })
      .expect(401);

    expect(res.body.message).toBe('Невалиден имейл или парола!');
  });

  it('should not login with missing fields', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({})
      .expect(400);

    expect(res.body.message).toBe('Моля, въведете имейл и парола!');
  });

  it('should logout a user', async () => {
    const res = await request(app)
      .post('/users/logout')
      .expect(200);

    const cookie = res.headers['set-cookie'][0];
    expect(cookie).toContain(`${AUTH_COOKIE_NAME}=;`);
  });

  it('should get user profile with valid token', async () => {
    const user = await new User(testUserData).save();
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '2h' });

    const res = await request(app)
      .get('/users/profile')
      .set('Cookie', `${AUTH_COOKIE_NAME}=${token}`)
      .expect(200);

    expect(res.body.email).toBe(testUserData.email);
    expect(res.body.password).toBeUndefined();
  });

  it('should return 404 for non-existing user profile', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const token = jwt.sign({ _id: fakeId }, JWT_SECRET, { expiresIn: '2h' });

    await request(app)
      .get('/users/profile')
      .set('Cookie', `${AUTH_COOKIE_NAME}=${token}`)
      .expect(404);
  });

  it('should update user info', async () => {
    const user = await new User(testUserData).save();
    const updatedData = { skillLevel: 'advanced' };

    const res = await request(app)
      .put(`/users/${user._id}`)
      .send(updatedData)
      .expect(200);

    expect(res.body.skillLevel).toBe('advanced');
  });

  it('should return 404 when updating non-existing user', async () => {
    const fakeId = new mongoose.Types.ObjectId();

    await request(app)
      .put(`/users/${fakeId}`)
      .send({ sport: 'snowboard' })
      .expect(404);
  });

  it('should change password successfully', async () => {
    const user = new User(testUserData);
    await user.save();

    const res = await request(app)
      .patch(`/users/${user._id}/change-password`)
      .send({ oldPassword: testUserData.password, newPassword: 'newpass123' })
      .expect(200);

    expect(res.body._id).toBeDefined();
  });

  it('should not change password with wrong old password', async () => {
    const user = await new User(testUserData).save();

    const res = await request(app)
      .patch(`/users/${user._id}/change-password`)
      .send({ oldPassword: 'wrong', newPassword: 'newpass123' })
      .expect(400);

    expect(res.body.message).toBe('Невалидна парола!');
  });

  it('should add a ski pass', async () => {
    const user = await new User(testUserData).save();

    const skiPass = {
      startDate: '2025-12-01',
      endDate: '2025-12-15',
      mountain: 'Vitosha',
      priceRate: 'standard'
    };

    const res = await request(app)
      .post(`/users/${user._id}/ski-pass`)
      .send(skiPass)
      .expect(200);

    expect(res.body.skiPasses.length).toBe(1);
    expect(res.body.skiPasses[0].mountain).toBe('Vitosha');
  });
});
