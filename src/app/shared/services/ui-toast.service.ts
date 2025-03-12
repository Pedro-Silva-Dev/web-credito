import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UI_TOAST_TYPE } from '../enums/ui-toast-type.enum';
import { UiToast } from '../models/ui-toast.model';

@Injectable({
  providedIn: 'root'
})
export class UiToastService {

  private _toastEvent$ = new Subject<UiToast>;

  public getEvent(): Observable<UiToast> {
    return this._toastEvent$.asObservable();
  }

  public sendSuccessMessage(message: string): void {
    this._sendMessage(UI_TOAST_TYPE.SUCCESS, message);
  }

  public sendWarningMessage(message: string): void {
    this._sendMessage(UI_TOAST_TYPE.WARNING, message);
  }

  public sendInfoMessage(message: string): void {
    this._sendMessage(UI_TOAST_TYPE.INFO, message);
  }

  public sendErrorMessage(message: string): void {
    this._sendMessage(UI_TOAST_TYPE.DANGER, message);
  }

  /************** METHODS PRIVATE **************/

  private _sendMessage(type: UI_TOAST_TYPE, message: string): void {
    const uiToast: UiToast = {type, message}
    this._toastEvent$.next(uiToast);
  }

}
