import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { UiTableComponent } from '../../shared/components/ui-table/ui-table.component';

@Component({
  selector: 'app-credito',
  imports: [
    UiTableComponent
  ],
  templateUrl: './credito.component.html',
  styleUrl: './credito.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditoComponent implements OnInit {

  ngOnInit(): void { }

}
