// main.route.test.js

const mainRoute = require('../main.route');

describe('Main Route Tests', () => {
  const req = {};
  const res = {
    json: jest.fn(),
  };

  describe('GET /', () => {
    it('should respond with a welcome message', () => {
      mainRoute(req, res);
      expect(res.json).toHaveBeenCalledWith({ message: 'Welcome to the Emergency Services API!' });
    });
  });


  describe('POST /unknown', () => {
    it('should respond with a 404 status code and message for unknown routes', () => {
      const unknownReq = { path: '/unknown' };
      mainRoute(unknownReq, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Route not found' });
    });
  });

  describe('PUT /', () => {
    it('should respond with a 405 status code and message for unsupported methods', () => {
      const unsupportedMethodReq = { method: 'PUT' };
      mainRoute(req, res);
      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ message: 'Method not allowed' });
    });
  });
});
