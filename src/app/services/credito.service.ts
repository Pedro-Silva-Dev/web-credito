import { Injectable, signal } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Credito } from '../models/credito.model';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditoService extends BaseService {

  public getCreditosPorNumeroNfse(numeroNfse: string, eventLoad = signal(false)): Observable<HttpResponse<Credito[]>> {
    const url = `/api/creditos/${numeroNfse}`;
    return this.get(url, eventLoad, null);
  }

  public getCreditoPorNumeroCredito(numeroCredito: string, eventLoad = signal(false)): Observable<HttpResponse<Credito>> {
    const url = `/api/creditos/credito/${numeroCredito}`;
    return this.get(url, eventLoad, null);
  }

}
