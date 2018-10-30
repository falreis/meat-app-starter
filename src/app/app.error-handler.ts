import {Observable} from 'rxjs/Observable'
import {HttpErrorResponse} from '@angular/common/http'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler{

  constructor(private ns: NotificationService
    , private injector: Injector
    , private zone: NgZone
  ){
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any){
    /*
    let errorMessage: string

    if(error instanceof HttpErrorResponse){
      //const body = error.error
      errorMessage = `Erro: ${error.status} ao acessar URL ${error.url} - ${error.statusText}`;
    }
    else{
      errorMessage = error.toString();
    }
    console.log(errorMessage)
    return Observable.throw(errorMessage);
    */
    if(errorResponse instanceof HttpErrorResponse){
      const message = errorResponse.error.message
      this.zone.run( () => {
        switch(errorResponse.status){
          case 401:
            this.injector.get(LoginService).handleLogin()
            break;
          case 403:
            this.ns.notify(message || 'Acesso negado!')
            break;
          case 404:
            this.ns.notify(message || 'Recurso não encontrado!')
            break;
        }
      })
    }
    super.handleError(errorResponse)
  }
}
