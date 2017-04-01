import {Component, OnInit} from '@angular/core';
import {IBlindsDevice, IAnalogDevice} from '../../../../../../server/entities/device.interface';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../notification/notification.service';
import {Port, portName} from '../../../../../../server/hardware/port-map';
import {PortHandler} from '../../service/port-handler';
import {HumidityDeviceCacheService} from '../../../cache/service/humidity-device.cache.service';
import {AnalogPortService} from '../../service/analog-port.service';

@Component({
  selector: 'app-humiditydevice-change',
  templateUrl: './humiditydevice-change.component.html',
  styleUrls: ['./humiditydevice-change.component.scss']
})
export class HumiditydeviceChangeComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  humidityDevice: IAnalogDevice = {};
  title: string;
  private backlink = '..';
  unusedPortHandler: PortHandler;

  constructor(private humidityDeviceCacheService: HumidityDeviceCacheService,
              private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private analogPortService: AnalogPortService) {
  }

  ngOnInit() {
    this.unusedPortHandler = new PortHandler(() => this.analogPortService.getUnusedInputPorts());
    this.subscriptions.push(this.route.params.subscribe(params => {
      if (params['id']) {
        this.humidityDeviceCacheService.getDevice(params['id']).subscribe(device => {
          this.humidityDevice = device;
          this.unusedPortHandler.registerPorts([this.humidityDevice.port]);
          this.title = 'Feuchtigkeitssensor ändern';
          this.backlink = '../..';
        });
      } else {
        this.title = 'Neuer Feuchtigkeitssensor anlegen';
      }
    }));
  }

  getPortName(port: Port): string {
    return portName(port);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  submit(humidityDevice: IBlindsDevice) {
    if (this.humidityDevice.id) {
      humidityDevice.id = this.humidityDevice.id;
      this.humidityDeviceCacheService.updateDevice(humidityDevice).subscribe(updatedHumidityDevice => {
        this.notificationService.info('Feuchtigkeitssensor aktualisiert');
        this.router.navigate(['../..'], {relativeTo: this.route});
      }, error => {
        this.notificationService.error(`Aktualisierung vom Feuchtigkeitssensor fehlgeschlagen (${JSON.stringify(error)})`);
      });
    } else {
      this.humidityDeviceCacheService.addDevice(humidityDevice).subscribe(createdHumidityDevice => {
        this.notificationService.info('Neuer Feuchtigkeitssensor erstellt');
        this.router.navigate(['..'], {relativeTo: this.route});
      }, error => {
        this.notificationService.error(`Erstellung vom Feuchtigkeitssensor fehlgeschlagen (${JSON.stringify(error)})`);
      });
    }
  }

  cancel() {
    if (this.humidityDevice.id) {
      this.router.navigate(['../..'], {relativeTo: this.route});
    } else {
      this.router.navigate(['..'], {relativeTo: this.route});
    }
  }
}
