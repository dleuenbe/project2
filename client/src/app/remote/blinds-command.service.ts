import {Injectable} from '@angular/core';
import {handleError} from './error-utils';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';
import {IBlindsCommand} from '../../../../server/entities/blinds-command.interface';

@Injectable()
export class BlindsCommandService {

  private readonly REST_URL = '/api/command/blinds';

  constructor(private authHttp: AuthHttp) {
  }

  command(cmd: IBlindsCommand): Observable<boolean> {
    return this.authHttp
      .put(this.REST_URL, JSON.stringify(cmd))
      .map(response => response.json() as boolean)
      .catch(handleError);
  }

}
