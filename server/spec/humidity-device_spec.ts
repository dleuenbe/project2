import {Logger, getLogger} from '../utils/logger';
import {RequestResponse} from 'request';
import {BASE_URL} from './constants';
import {IAnalogDevice} from '../entities/device.interface';
import {Port} from '../hardware/port-map';
import {loginOptions, authBearerOptions} from './httpOptions';

const LOGGER: Logger = getLogger('humidity_device_spec');

describe('REST API Roundtrip Test of Humidity-Device', function () {
  const LOGIN_URL = BASE_URL + 'api/authenticate';
  const TEST_URL = BASE_URL + 'api/devices/humidity';
  const TEST_HUMIDITY_DEVICE = 'Test Humidity 99';

  let request = require('request');
  let adminToken: string;
  let testHumidityDeviceId: any;

  describe('Test login and creation of a humidity-device', function () {
    it('returns status code 200 - successfull authentication', function (done) {
      request.post(LOGIN_URL,
        loginOptions('admin', '12345678'),
        function (error: any, response: RequestResponse, body: any) {
          expect(response.statusCode).toBe(200);
          let authData = JSON.parse(body);
          adminToken = authData.token;
          LOGGER.debug(`admin-token: ${adminToken}`);
          done();
        });
    });

    let testHumidityDevice: IAnalogDevice = {
      name: TEST_HUMIDITY_DEVICE,
      port: Port.AI_1,
      pollingInterval: 10
    };
    LOGGER.debug(`requestContent: ${JSON.stringify(testHumidityDevice)}`);
    it('returns status code 201 - humidity-device created', function (done) {
      request.post(TEST_URL,
        authBearerOptions(adminToken, JSON.stringify(testHumidityDevice)),
        function (error: any, response: RequestResponse, body: any) {
          LOGGER.debug(`Humidity-device created (body): ${JSON.stringify(body)}`);
          expect(response.statusCode).toBe(201);
          let humidityDevice: IAnalogDevice = JSON.parse(body);
          LOGGER.debug(`Humidity-device created: ${JSON.stringify(humidityDevice)}`);
          testHumidityDeviceId = humidityDevice.id;
          LOGGER.debug(`testDeviceId: ${testHumidityDeviceId}`);
          done();
        });
    });
    it('returns status code 500 - humidity-device already exists', function (done) {
      request.post(TEST_URL,
        authBearerOptions(adminToken, JSON.stringify(testHumidityDevice)),
        function (error: any, response: RequestResponse, body: any) {
          expect(response.statusCode).toBe(500);
          done();
        });
    });
  });

  describe('Test get dedicated humidity-device', function () {
    it('returns status code 200 - found humidity-device', function (done) {
      request.get(TEST_URL + '/' + testHumidityDeviceId,
        authBearerOptions(adminToken),
        function (error: any, response: RequestResponse, body: any) {
          expect(response.statusCode).toBe(200);
          let humidityDevice: IAnalogDevice = JSON.parse(body);
          LOGGER.debug(`Humidity-device retrieved: ${JSON.stringify(humidityDevice)}`);
          expect(humidityDevice.name).toBe(TEST_HUMIDITY_DEVICE);
          done();
        });
    });
  });

  describe('Test update of a humidity-device', function () {
    let NAME: string = 'Test Humidity 007';
    let testHumidityDevice: IAnalogDevice = {
      id: testHumidityDeviceId,
      name: NAME,
      port: Port.AI_1,
      pollingInterval: 10
    };
    LOGGER.debug(`requestContent: ${JSON.stringify(testHumidityDevice)}`);
    it('returns status code 200 - humidity-device updated', function (done) {
      request.put(TEST_URL + '/' + testHumidityDeviceId,
        authBearerOptions(adminToken, JSON.stringify(testHumidityDevice)),
        function (error: any, response: RequestResponse, body: any) {
          expect(response.statusCode).toBe(200);
          let humidityDevice: IAnalogDevice = JSON.parse(body);
          LOGGER.debug(`Humidity-device updated: ${JSON.stringify(humidityDevice)}`);
          expect(humidityDevice.name).toBe(NAME);
          done();
        });
    });
  });

  describe('Test deletion of a humidity-device', function () {
    it('returns status code 200 - humidity-device deleted', function (done) {
      request.delete(TEST_URL + '/' + testHumidityDeviceId,
        authBearerOptions(adminToken),
        function (error: any, response: RequestResponse, body: any) {
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(body)).toBe(testHumidityDeviceId);
          testHumidityDeviceId = null;
          done();
        });
    });
  });

  afterAll(function () {
    if (testHumidityDeviceId) {
      LOGGER.error(`AfterAll: test humidity-device with id ${testHumidityDeviceId} has not been deleted. Please clean it from the database manually.`);
    }
  });

});
