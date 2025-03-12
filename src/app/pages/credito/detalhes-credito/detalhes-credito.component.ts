import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { Credito } from '../../../models/credito.model';
import { UiTableComponent } from '../../../shared/components/ui-table/ui-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-credito',
  imports: [
    CommonModule,
    UiTableComponent
  ],
  templateUrl: './detalhes-credito.component.html',
  styleUrl: './detalhes-credito.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalhesCreditoComponent implements OnInit {

  @Input() credito!: Credito;

  ngOnInit(): void { }

}
