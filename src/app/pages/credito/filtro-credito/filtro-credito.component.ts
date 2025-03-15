import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal, WritableSignal, type OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UiButtonComponent } from '../../../shared/components/UiButton/ui-button.component';
import { UiInputDirective } from '../../../shared/directives/ui-input.directive';
import { UiLabelDirective } from '../../../shared/directives/ui-label.directive';
import { distinctUntilChanged, debounceTime } from 'rxjs';
import { Credito } from '../../../models/credito.model';
import { CreditoService } from '../../../services/credito.service';
import { TipoFiltroCredito } from '../../../models/tipo-filtro-credito.model';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-filtro-credito',
  imports: [
    UiButtonComponent,
    ReactiveFormsModule,
    UiInputDirective,
    UiLabelDirective,
    NgxMaskDirective
  ],
  templateUrl: './filtro-credito.component.html',
  styleUrl: './filtro-credito.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltroCreditoComponent implements OnInit {

  @Output() pesquisarEvent = new EventEmitter<TipoFiltroCredito>();
  @Input() carregandoCreditosEvent = signal(false);

  private _formBuilder = inject(FormBuilder);

  public filtroValido = signal(false);
  public filtro = this._formBuilder.group({
    numeroNfse: [''],
    numeroCredito: ['']
  });

  public creditos: WritableSignal<Credito[]> = signal([]);

  ngOnInit(): void {
    this._setConfigFiltro();
  }

  public pesquisar(): void {
    if(this.filtroValido()) {
      if(this.filtro?.value?.numeroNfse) {
        this.pesquisarEvent.emit({tipo: 'numeroNfse', value: this.filtro.value.numeroNfse});
      }else {
        this.pesquisarEvent.emit({tipo: 'numeroCredito', value: this.filtro.value.numeroCredito!});
      }
    }
  }

  /******************* METHODS PRIVATE *******************/

  private _setConfigFiltro(): void {
    this.filtro?.valueChanges?.pipe(
        distinctUntilChanged(),
        debounceTime(200),
      ).subscribe(res => {
      if(res.numeroCredito && !this.filtro.get('numeroNfse')?.disabled) {
        this._desabilitarFiltro(`numeroNfse`);
        this.filtroValido.set(true);
      }else if(res.numeroNfse && !this.filtro.get('numeroCredito')?.disabled) {
        this._desabilitarFiltro(`numeroCredito`);
        this.filtroValido.set(true);
      }else if(!res.numeroCredito && !res.numeroNfse) {
        this._habilitarFiltro(`numeroNfse`);
        this._habilitarFiltro(`numeroCredito`);
        this.filtroValido.set(false);
      }
    });
  }

  private _desabilitarFiltro(campo: string): void {
    this.filtro.get(campo)?.disable();
  }

  private _habilitarFiltro(campo: string): void {
    this.filtro.get(campo)?.enable();
  }

}
