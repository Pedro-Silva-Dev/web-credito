import { ChangeDetectionStrategy, Component, Input, signal, WritableSignal, type OnInit } from '@angular/core';
import { UiTableComponent } from '../../../shared/components/ui-table/ui-table.component';
import { Credito } from '../../../models/credito.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-tabela-credito',
  imports: [
    UiTableComponent,
    CommonModule
  ],
  templateUrl: './tabela-credito.component.html',
  styleUrl: './tabela-credito.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabelaCreditoComponent implements OnInit {

  @Input() creditos: WritableSignal<Credito[]> = signal([]);

  ngOnInit(): void { }

}
