import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-card',
  imports: [],
  templateUrl: './ui-card.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCardComponent { 

  @Input() default: boolean = false;
  @Input() title: boolean = false;
  @Input() header: boolean = true;
  @Input() body: boolean = true;
  @Input() footer: boolean = true;
  @Input() isTransparent: boolean = false;
  @Input() isPadding: boolean = true;

}
