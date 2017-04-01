import {ActivatedRoute, Router} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';
import {IDevice} from '../../../../../../server/entities/device.interface';
import {DeviceType} from '../../../misc/device-pool';
import {IAnalogData} from '../../../../../../server/entities/data.interface';
import {TemperatureDeviceCacheService} from '../../../cache/service/temperature-device.cache.service';
import {HumidityDeviceCacheService} from '../../../cache/service/humidity-device.cache.service';
import {GenericeCacheService} from '../../../cache/service/generic.cache.service';
import {TemperatureDataCacheService} from '../../../cache/service/temperature-data.cache.service';
import {HumidityDataCacheService} from '../../../cache/service/humidity-data.cache.service';
import {GenericDataCacheService} from '../../../cache/service/generic-data-cache.service';

@Component({
  selector: 'app-all-of-type',
  templateUrl: './all-of-type.component.html',
  styleUrls: ['./all-of-type.component.scss']
})
export class AllOfTypeComponent implements OnInit {

  @Input() deviceType: DeviceType;

  title: string;
  units: string;

  deviceCacheService: GenericeCacheService<IDevice>;
  dataCacheService: GenericDataCacheService<IAnalogData, IDevice>;

  constructor(private route: ActivatedRoute, private router: Router,
              private temperatureDeviceCacheService: TemperatureDeviceCacheService,
              private temperatureDataCacheService: TemperatureDataCacheService,
              private humidityDeviceCacheService: HumidityDeviceCacheService,
              private humidityDataCacheService: HumidityDataCacheService) {
  }

  ngOnInit() {
    if (this.deviceType === DeviceType.HUMIDITY) {
      this.title = 'Feuchtigkeit-Übersicht';
      this.units = '%rel';
      this.deviceCacheService = this.humidityDeviceCacheService;
      this.dataCacheService = this.humidityDataCacheService;
    } else {
      this.title = 'Temperatur-Übersicht';
      this.units = '°C';
      this.deviceCacheService = this.temperatureDeviceCacheService;
      this.dataCacheService = this.temperatureDataCacheService;
    }
  }

  private select(device: IDevice): void {
    const path: string = this.deviceType === DeviceType.HUMIDITY ? '../humidity' : '../temperature';
    this.router.navigate([path, device.id], {relativeTo: this.route});
  }
}
