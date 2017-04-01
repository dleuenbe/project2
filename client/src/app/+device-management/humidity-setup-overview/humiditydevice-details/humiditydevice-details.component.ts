import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IAnalogDevice} from '../../../../../../server/entities/device.interface';
import {Subscription} from 'rxjs/Subscription';
import {Port, portName} from '../../../../../../server/hardware/port-map';
import {HumidityDeviceCacheService} from '../../../cache/service/humidity-device.cache.service';

@Component({
  selector: 'app-humiditydevice-details',
  templateUrl: './humiditydevice-details.component.html',
  styleUrls: ['./humiditydevice-details.component.scss']
})
export class HumiditydeviceDetailsComponent implements OnInit {

  private sub: Subscription;
  humidityDevice: IAnalogDevice = {};

  constructor(private humidityDeviceCacheService: HumidityDeviceCacheService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.humidityDeviceCacheService.getDevice(params['id']).subscribe(device => {
          this.humidityDevice = device;
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  convert(port: Port): string {
    return portName(port);
  }
}
