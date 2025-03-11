import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { UiCardComponent } from '../ui-card/ui-card.component';
import { BehaviorSubject, Unsubscribable } from 'rxjs';

@Component({
  selector: 'ui-table',
  imports: [
    UiCardComponent
  ],
  templateUrl: './ui-table.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTableComponent {
   
  @Input() loadEvent = signal(false);
  @Input() header: boolean = false;
  @Input() footer: boolean = false;
  @Input() empty: boolean = false;
  @Input() default: boolean = false;

}