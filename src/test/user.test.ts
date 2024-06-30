// test/user.routes.test.ts
const  request=  require('supertest');
const express  = require ('express');
const  userRouter = require ('../routes/user.routes');
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use('/api/users', userRouter);

describe('User Routes', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/DictionaryMeetingF_test`
    await mongoose.connect(url, { });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/users should return a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/users/login should return a token for valid credentials', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'admin@example.com', password: 'password' });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('POST /api/users should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .field('name', 'Test User')
      .field('email', 'testuser@example.com')
      .field('password', 'password')
      .attach('profileImage', 'path/to/test/image.jpg'); 
    expect(response.status).toBe(201);
    expect(response.body.email).toBe('testuser@example.com');
  });
});
