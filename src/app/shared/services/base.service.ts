import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError, take, tap } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE_URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected http: HttpClient = inject(HttpClient);

  protected get(url: string, eventLoad = signal(false), build?: any, sort?: string): Observable<HttpResponse<any>> {
    eventLoad.set(true);
    const sortParam = sort ? `&${sort}` : '';
    return this.http.get<any>(`${BASE_URL}${url}?success=true${this._getInfoBuild(build)}${sortParam}`, { observe: 'response' }).pipe(catchError(
    (err: any) => {
        eventLoad.set(false);
        return throwError(() => err);
      }
    )).pipe(take(1)).pipe(tap((_: any) => eventLoad.set(false)));
  }

  /******************* METHODS PRIVATE *******************/

  private _getInfoBuild(paramsBuild: any): string {
    const build = this._getParamsBuild(paramsBuild);
    const arrayActive = build?.filter(r => r);
    const arrayNormalized = arrayActive?.map(r => {
      const params = r.split('=');
      const data = params[1]?.replaceAll(',', '@');
      return `${params[0]}=${data}`;
    })
    const params = arrayNormalized?.toString()?.replaceAll(',', '')?.replaceAll('@', ',')
    return params;
  }

  private _getParamsBuild(build: any): string[] {
    let array: string[] = [];
    if (build) {
      Object.keys(build)?.forEach(key => {
        const isFieldValid = ((Array.isArray(build[key]) && build[key]?.length) || !Array.isArray(build[key])) ? true : false;
        if (build[key] != null && build[key] != undefined && isFieldValid) {
          const item = `&${key}=${encodeURIComponent(build[key])}`;
          if(item && item?.length) {
            array.push(item);
          }
        }
      });
    }
    return array;
  }

}
