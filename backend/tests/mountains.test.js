const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mountainRoutes = require('../routes/mountains');
const Mountain = require('../models/Mountain');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/mountains', mountainRoutes);
});

afterEach(async () => {
  await Mountain.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Mountain API', () => {
  const sampleMountain = {
    mountainName: 'Vitosha',
    imageUrl: 'https://example.com/vitosha.jpg',
    nameEnglish: 'Vitosha',
    description: 'A beautiful mountain near Sofia.',
    slopes: [
      {
        slopeName: 'Aleko',
        isOpen: true,
        skillLevel: 'Intermediate',
        length: 2000
      }
    ],
    restaurants: [
      {
        restaurantName: 'Hizha Aleko',
        cuisineType: 'Bulgarian',
        nearestSlope: 'Aleko',
        googleMapsLink: 'https://maps.google.com/hizha-aleko'
      }
    ],
    accomodation: [
      {
        accomodationName: 'Hotel Moreni',
        accomodationType: 'Hotel',
        nearestSlope: 'Aleko',
        googleMapsLink: 'https://maps.google.com/moreni'
      }
    ],
    parkings: [
      {
        parkingName: 'Aleko Parking',
        nearestSlope: 'Aleko',
        isFree: false,
        googleMapsLink: 'https://maps.google.com/aleko-parking'
      }
    ]
  };

  test('should create a new mountain', async () => {
    const res = await request(app).post('/mountains').send(sampleMountain);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.mountainName).toBe('Vitosha');
  });

  test('should get all mountains', async () => {
    await Mountain.create(sampleMountain);
    const res = await request(app).get('/mountains');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].mountainName).toBe('Vitosha');
  });

  test('should update a mountain', async () => {
    const mountain = await Mountain.create(sampleMountain);
    const res = await request(app).put(`/mountains/${mountain._id}`).send({
      description: 'Updated description'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe('Updated description');
  });

  test('should delete a mountain', async () => {
    const mountain = await Mountain.create(sampleMountain);
    const res = await request(app).delete(`/mountains/${mountain._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Mountain deleted');
  });

  test('should return 404 when deleting non-existent mountain', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/mountains/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Mountain not found');
  });
});
