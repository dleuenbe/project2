import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {GenericeCacheService} from './generic.cache.service';
import {ClientSocketService} from '../../remote/client-socket.service';
import {NotificationService} from '../../notification/notification.service';
import {IBlindsDevice} from '../../../../../server/entities/device.interface';

@Injectable()
export class BlindsDeviceCacheService extends GenericeCacheService<IBlindsDevice> {
  constructor(private authHttp: AuthHttp, private socketService1: ClientSocketService, private notificationService1: NotificationService) {
    super(authHttp, socketService1, notificationService1, '/api/devices/blinds', '/blinds');
  }
}
