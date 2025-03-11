import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal, type OnInit } from '@angular/core';
import { UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { Credito } from '../../models/credito.model';
import { CreditoService } from '../../services/credito.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UiInputDirective } from '../../shared/directives/ui-input.directive';
import { UiLabelDirective } from '../../shared/directives/ui-label.directive';
import { UiButtonComponent } from '../../shared/components/UiButton/UiButton.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-credito',
  imports: [
    UiTableComponent,
    UiButtonComponent,
    ReactiveFormsModule,
    UiInputDirective,
    UiLabelDirective,
  ],
  templateUrl: './credito.component.html',
  styleUrl: './credito.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditoComponent implements OnInit {

  private _creditoService = inject(CreditoService);
  private _formBuilder = inject(FormBuilder);

  public carregandoCreditosEvent = signal(false);
  public numeroNfseVisivel = signal(true);
  public numeroCreditoVisivel = signal(true);

  public filtro = this._formBuilder.group({
    numeroNfse: [''],
    numeroCredito: ['']
  });

  public creditos: WritableSignal<Credito[]> = signal([]);

  ngOnInit(): void {
    this._setConfigFiltro();
  }

  public pesquisar(): void {
    if(this.filtro?.valid) {
      if(this.filtro?.value?.numeroNfse) {
        this._setCreditosPorNfse(this.filtro.value.numeroNfse);
      }else {
        this._setCreditosPorNumeroCredito(this.filtro.value.numeroCredito!);
      }
    }
  }


  /******************* METHODS PRIVATE *******************/

  private _setConfigFiltro(): void {
    this.filtro?.valueChanges?.pipe(
        distinctUntilChanged(),
        debounceTime(300),
      ).subscribe(res => {
      if(res.numeroCredito && !this.filtro.get('numeroNfse')?.disabled) {
        this._desabilitarFiltro(`numeroNfse`);
      }else if(res.numeroNfse && !this.filtro.get('numeroCredito')?.disabled) {
        this._desabilitarFiltro(`numeroCredito`);
      }else if(!res.numeroCredito && !res.numeroNfse) {
        this._habilitarFiltro(`numeroNfse`);
        this._habilitarFiltro(`numeroCredito`);
      }
    });
  }

  private _desabilitarFiltro(campo: string): void {
    this.filtro.get(campo)?.disable();
  }

  private _habilitarFiltro(campo: string): void {
    this.filtro.get(campo)?.enable();
  }

  private _setCreditosPorNfse(numeroNfse: string): void {
    this._creditoService.getCreditosPorNumeroNfse(numeroNfse, this.carregandoCreditosEvent).subscribe(res => {
      if(res.status == 200) {
        this.creditos.set(res.body!);
      }
    });
  }

  private _setCreditosPorNumeroCredito(numeroCredito: string): void {
    this._creditoService.getCreditoPorNumeroCredito(numeroCredito, this.carregandoCreditosEvent).subscribe(res => {
      if(res.status == 200) {
        this.creditos.set([res.body!]);
      }
    });
  }

}
