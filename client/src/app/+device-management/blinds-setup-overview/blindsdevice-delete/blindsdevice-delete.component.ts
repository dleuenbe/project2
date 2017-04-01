import {Component, OnInit} from '@angular/core';
import {BlindsDeviceCacheService} from '../../../cache/service/blinds-device.cache.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IBlindsDevice} from '../../../../../../server/entities/device.interface';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../../../notification/notification.service';

@Component({
  selector: 'app-blindsdevice-delete',
  templateUrl: './blindsdevice-delete.component.html',
  styleUrls: ['./blindsdevice-delete.component.scss']
})
export class BlindsdeviceDeleteComponent implements OnInit {

  private sub: Subscription;
  blind: IBlindsDevice = {};

  constructor(private blindsCacheService: BlindsDeviceCacheService,
              private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.blindsCacheService.getDevice(params['id']).subscribe(device => {
          this.blind = device;
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deleteBlind() {
    if (this.blind.id) {
      this.blindsCacheService.delDevice(this.blind.id).subscribe(deletedBlindId => {
        this.notificationService.info(`Rollladen gelöscht.`);
        this.router.navigate(['../..'], {relativeTo: this.route});
      }, error => {
        this.notificationService.error(`Rollladen konnte nicht gelöscht werden (${JSON.stringify(error)})`);
      });
    }
  }

  cancel() {
    this.router.navigate(['../..'], {relativeTo: this.route});
  }
}
