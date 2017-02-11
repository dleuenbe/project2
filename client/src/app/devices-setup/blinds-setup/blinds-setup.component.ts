import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GenericService} from "../../remote/generic.service";
import {AuthHttp} from "angular2-jwt";
import {ClientSocketService} from "../../remote/client-socket.service";

import {BlindsDevice, BlindsDeviceCharacteristics, Port, portName} from '../../device-pool';

@Component({
  selector: 'app-blinds-setup',
  templateUrl: 'blinds-setup.component.html',
  styleUrls: ['blinds-setup.component.scss']
})
export class BlindsSetupComponent implements OnInit {
  headerTitle: string = 'ROLLLADEN-SETUP';
  devices: BlindsDevice[] = [];
  device: BlindsDevice;
  selectedDevice: BlindsDevice;
  keyPorts: Port[] = BlindsDeviceCharacteristics.inputPortSet;
  actorPorts: Port[] = BlindsDeviceCharacteristics.outputPortSet;
  private genericService: GenericService<BlindsDevice>;
  message: string;

  constructor(private router: Router,
              private socketService: ClientSocketService, private authHttp: AuthHttp) {
  }

  ngOnInit() {
    this.genericService = new GenericService<BlindsDevice>(this.authHttp,
      this.socketService, "/api/devices/blinds", "/blinds");
    this.genericService.items.subscribe(devices => {
      this.devices = devices.toArray();
      this.device = null;
      this.selectedDevice = null;
    }, error => this.message = error.toString());
    this.genericService.getAll();
  }

  ngOnDestroy() {
    this.genericService.disconnect();
  }

  backClicked(): void {
    this.router.navigate(['/devices']);
  }

  addClicked(): void {
    this.device = new BlindsDevice();
  }

  selectDevice(device: BlindsDevice) {
    this.clearMessage();
    this.selectedDevice = device;
    this.device = new BlindsDevice(this.selectedDevice.id, this.selectedDevice.name, this.selectedDevice.keyUp, this.selectedDevice.keyDown, this.selectedDevice.actorUp, this.selectedDevice.actorDown, this.selectedDevice.runningSeconds);
  }

  getPortName(port: Port): string {
    return portName(port);
  }

  doAddOrUpdate(): void {
    if (this.device) {
      if (this.device.id) {
        this.genericService.update(this.device);
      } else {
        this.genericService.create(this.device);
      }
    }
  }

  doDelete(): void {
    if (this.device && this.device.id) {
      this.genericService.del(this.device.id);
    }
  }

  clearMessage(): void {
    this.message = null;
  }

}