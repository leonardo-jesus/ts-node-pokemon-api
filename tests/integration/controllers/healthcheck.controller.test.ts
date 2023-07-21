import { app } from '../../../src/config/app';
import request from 'supertest';

describe('GET /api/healthcheck', () => {
    it('should return 204', async () => {
        return request(app).get('/api/healthcheck').expect(204);
    });
});
