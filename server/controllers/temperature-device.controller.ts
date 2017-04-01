import express = require('express');
import {ITemperatureDeviceDocument, TemperatureDeviceModel} from '../models/temperature-device.model';
import {IAnalogDevice} from '../entities/device.interface';
import {SocketService} from '../socket/socket-service';
import {GenericDeviceController} from './generic-device.controller';

export class TemperatureDeviceController extends GenericDeviceController<IAnalogDevice, ITemperatureDeviceDocument> {
  constructor(socketService: SocketService) {
    super(socketService,
      '/temperature',
      TemperatureDeviceModel,
      c => new TemperatureDeviceModel(c),
      (d, i) => TemperatureDeviceController.updateDocument(d, i)
    );
  }

  private static updateDocument(documentFromDb: ITemperatureDeviceDocument, inputDocument: ITemperatureDeviceDocument) {
    documentFromDb.name = inputDocument.name;
    documentFromDb.port = inputDocument.port;
    documentFromDb.pollingInterval = inputDocument.pollingInterval;
  }

}
