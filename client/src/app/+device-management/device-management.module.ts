import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuard} from '../auth/auth-guard.service';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {Http, RequestOptions} from '@angular/http';
import {DeviceOverviewModule} from '../device-overview/device-overview.module';
import {DeviceManagementRouterModule} from './device-management-router/device-management-router.module';
import {DeviceManagementComponent} from './device-management/device-management.component';
import {BlindsSetupOverviewComponent} from './blinds-setup-overview/blinds-setup-overview.component';
import {TemperatureSetupOverviewComponent} from './temperature-setup-overview/temperature-setup-overview.component';
import {HumiditySetupOverviewComponent} from './humidity-setup-overview/humidity-setup-overview.component';
import {MaterialModule} from '@angular/material';
import {ListSupportModule} from '../list-support/list-support.module';
import {BlindsdeviceDetailsComponent} from './blinds-setup-overview/blindsdevice-details/blindsdevice-details.component';
import {BlindsdeviceChangeComponent} from './blinds-setup-overview/blindsdevice-change/blindsdevice-change.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AnalogPortService} from './service/analog-port.service';
import {DigitalPortService} from './service/digital-port.service';
import {BlindsdeviceDeleteComponent} from './blinds-setup-overview/blindsdevice-delete/blindsdevice-delete.component';
import {HumiditydeviceChangeComponent} from './humidity-setup-overview/humiditydevice-change/humiditydevice-change.component';
import {HumiditydeviceDeleteComponent} from './humidity-setup-overview/humiditydevice-delete/humiditydevice-delete.component';
import {HumiditydeviceDetailsComponent} from './humidity-setup-overview/humiditydevice-details/humiditydevice-details.component';
import {
  TemperaturedeviceDetailsComponent
} from './temperature-setup-overview/temperaturedevice-details/temperaturedevice-details.component';
import {TemperaturedeviceDeleteComponent} from './temperature-setup-overview/temperaturedevice-delete/temperaturedevice-delete.component';
import {TemperaturedeviceChangeComponent} from './temperature-setup-overview/temperaturedevice-change/temperaturedevice-change.component';
import {ValidatorsModule} from 'ng2-validators';
import {MiscValidatorsModule} from '../misc-validators/misc-validators.module';
import {PipesModule} from '../+dashboard/analog-devices/pipes/pipes.module';
import {PortsService} from './service/ports.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Content-Type': 'application/json'}]
  }), http, options);
}

@NgModule({
  imports: [
    CommonModule,
    DeviceManagementRouterModule,
    DeviceOverviewModule,
    MaterialModule,
    ListSupportModule,
    FormsModule,
    ReactiveFormsModule,
    ValidatorsModule,
    MiscValidatorsModule,
    PipesModule,
  ],
  declarations: [
    DeviceManagementComponent,
    BlindsSetupOverviewComponent,
    TemperatureSetupOverviewComponent,
    HumiditySetupOverviewComponent,
    BlindsdeviceDetailsComponent,
    BlindsdeviceChangeComponent,
    BlindsdeviceDeleteComponent,
    HumiditydeviceChangeComponent,
    HumiditydeviceDeleteComponent,
    HumiditydeviceDetailsComponent,
    TemperaturedeviceDetailsComponent,
    TemperaturedeviceDeleteComponent,
    TemperaturedeviceChangeComponent,
  ],
  providers: [
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    DigitalPortService,
    AnalogPortService,
    PortsService,
  ],
})
export class DeviceManagementModule {
}
