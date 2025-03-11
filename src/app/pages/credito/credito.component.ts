import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal, type OnInit } from '@angular/core';
import { UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { Credito } from '../../models/credito.model';
import { CreditoService } from '../../services/credito.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UiInputDirective } from '../../shared/directives/ui-input.directive';
import { UiLabelDirective } from '../../shared/directives/ui-label.directive';
import { UiButtonComponent } from '../../shared/components/UiButton/UiButton.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FiltroCreditoComponent } from "./filtro-credito/filtro-credito.component";
import { TipoFiltroCredito } from '../../models/tipo-filtro-credito.model';
import { TabelaCreditoComponent } from './tabela-credito/tabela-credito.component';
import { UiToastService } from '../../shared/services/UiToast.service';

@Component({
  selector: 'app-credito',
  imports: [
    FiltroCreditoComponent,
    TabelaCreditoComponent
],
  templateUrl: './credito.component.html',
  styleUrl: './credito.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditoComponent implements OnInit {

  private _creditoService = inject(CreditoService);
  private _toastrService: UiToastService = inject(UiToastService);

  public pesquisarCredito = signal(true);
  public carregandoCreditosEvent = signal(false);
  public creditos: WritableSignal<Credito[]> = signal([]);

  ngOnInit(): void {
    
  }

  public pesquisar(tipoFiltro: TipoFiltroCredito): void {
    if(tipoFiltro?.tipo == 'numeroNfse') {
      this._setCreditosPorNfse(tipoFiltro.value);
    }else {
      this._setCreditosPorNumeroCredito(tipoFiltro.value);
    }
  }

  /******************* METHODS PRIVATE *******************/

  private _setCreditosPorNfse(numeroNfse: string): void {
    this._creditoService.getCreditosPorNumeroNfse(numeroNfse, this.carregandoCreditosEvent).subscribe(res => {
      if(res.status == 200) {
        this.creditos.set(res.body!);
        if(res.body) {
          this.pesquisarCredito.set(false);
        }else {
          this._toastrService.sendInfoMessage(`Nenhum registro encontrado, verifique o NFS-e e tente novamente.`);
        }
      }
    });
  }

  private _setCreditosPorNumeroCredito(numeroCredito: string): void {
    this._creditoService.getCreditoPorNumeroCredito(numeroCredito, this.carregandoCreditosEvent).subscribe(res => {
      if(res.status == 200) {
        this.creditos.set([res.body!]);
        if(res.body) {
          this.pesquisarCredito.set(false);
        }else {
          this._toastrService.sendInfoMessage(`Nenhum registro encontrado, verifique o número de crédito e tente novamente.`);
        }
      }
    }, err => {
      this._toastrService.sendInfoMessage(`Nenhum registro encontrado, verifique o número de crédito e tente novamente.`);
    });
  }

}
