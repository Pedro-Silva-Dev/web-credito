import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal, TemplateRef, WritableSignal, type OnInit } from '@angular/core';
import { UiTableComponent } from '../../../shared/components/ui-table/ui-table.component';
import { Credito } from '../../../models/credito.model';
import { CommonModule, DatePipe } from '@angular/common';
import { UiLinkDirective } from '../../../shared/directives/ui-link.directive';
import { ModalConfig } from '../../../shared/models/modal-config.model';
import { MODAL_SIZE } from '../../../shared/enums/modal-size.enum';
import { UiModalService } from '../../../shared/services/ui-modal.service';
import { DetalhesCreditoComponent } from '../detalhes-credito/detalhes-credito.component';

@Component({
  selector: 'app-tabela-credito',
  imports: [
    UiTableComponent,
    UiLinkDirective,
    CommonModule,
    DetalhesCreditoComponent
  ],
  templateUrl: './tabela-credito.component.html',
  styleUrl: './tabela-credito.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabelaCreditoComponent implements OnInit {

  @Output() navegarParaFiltrarCreditoEvent = new EventEmitter<boolean>();
  @Input() creditos: WritableSignal<Credito[]> = signal([]);

  private _modalService: UiModalService = inject(UiModalService);

  public creditoSelecionado!: Credito;

  ngOnInit(): void { }

  public navegarParaFiltrarCredito(): void {
    this.navegarParaFiltrarCreditoEvent.emit(true);
  }

  public exibirModalDetalhesCredito(template: TemplateRef<any>, credito: Credito): void {
    this.creditoSelecionado = credito;
    const title = `Número de crédito: ${credito?.numeroCredito}`;
    const config: ModalConfig = {title, size: MODAL_SIZE.LARGE, template};
    this._modalService.openModal(config);
  }

}
