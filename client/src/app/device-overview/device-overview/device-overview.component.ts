import {Component, OnInit, OnDestroy} from "@angular/core";
import {
  DeviceType,
  DevicesInfo,
  devicePool,
  blindsDevicesInfo,
  temperatureDevicesInfo,
  humidityDevicesInfo
} from "../../misc/device-pool";
import {Router, ActivatedRoute} from "@angular/router";
import {GenericService} from "../../remote/generic.service";
import {IBlindsDevice, IHumidityDevice, ITemperatureDevice} from "../../../../../server/entities/device.interface";
import {NotificationService} from "../../notification/notification.service";
import {TemperatureDeviceCacheService} from "../../cache/temperature-device.cache.service";
import {BlindsDeviceCacheService} from "../../cache/blinds-device.cache.service";
import {HumidityDeviceCacheService} from "../../cache/humidity-device.cache.service";

@Component({
  selector: 'app-device-overview',
  templateUrl: 'device-overview.component.html',
  styleUrls: ['device-overview.component.scss']
})
export class DeviceOverviewComponent implements OnInit, OnDestroy {
  devicePool: DevicesInfo[] = devicePool;
  blindsDeviceService: GenericService<IBlindsDevice>;
  humidityDeviceService: GenericService<IHumidityDevice>;
  temperatureDeviceService: GenericService<ITemperatureDevice>;


  constructor(private router: Router,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private blindsDeviceCache: BlindsDeviceCacheService,
              private temperatureDeviceCache: TemperatureDeviceCacheService,
              private humidityDeviceCache: HumidityDeviceCacheService) {
  }

  ngOnInit() {
    this.handleBlindsDevices();
    this.handleHumidityDevices();
    this.handleTemperatureDevices();
  }

  ngOnDestroy() {
    this.blindsDeviceCache.disconnect();
    this.humidityDeviceCache.disconnect();
    this.temperatureDeviceCache.disconnect();
  }

  clickAction(device: DevicesInfo): void {
    switch (device.type) {
      case DeviceType.BLINDS:
        this.router.navigate(['../blinds-overview'], {relativeTo: this.route});
        break;
      case DeviceType.HUMIDITY:
        this.router.navigate(['../humidity-overview'], {relativeTo: this.route});
        break;
      case DeviceType.TEMPERATURE:
        this.router.navigate(['../temperature-overview'], {relativeTo: this.route});
        break;
    }
  }

  handleBlindsDevices(): void {
    this.blindsDeviceCache.getDataService().subscribe(dataService => {
      blindsDevicesInfo.count = dataService.getCount();
    }, error => {
      this.notificationService.error(`blindsdevice subscrition failed with ${error.toString()}`);
    });
  }

  handleHumidityDevices(): void {
    this.humidityDeviceCache.getDataService().subscribe(dataService => {
      humidityDevicesInfo.count = dataService.getCount();
    }, error => {
      this.notificationService.error(`humitidydevice subscrition failed with ${error.toString()}`);
    });
  }

  handleTemperatureDevices(): void {
    this.temperatureDeviceCache.getDataService().subscribe(dataService => {
      temperatureDevicesInfo.count = dataService.getCount();
    }, error => {
      this.notificationService.error(`temperaturedevice subscrition failed with ${error.toString()}`);
    });
  }

}