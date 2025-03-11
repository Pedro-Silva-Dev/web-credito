import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { UI_TOAST_TYPE } from '../../enums/ui-toast-type.enum';
import { UiToastService } from '../../services/UiToast.service';

@Component({
  selector: 'ui-toast',
  imports: [
      CommonModule,
  ],
  template: `
@if(!disable()) {
  <div class="transition-opacity duration-1000 ease-out z-[9999] {{active() ? 'opacity-100 fixed' : 'opacity-0'}}">
      <div class="toast toast-top toast-end">
        <div class="md:max-w-[25rem] alert {{type()}}">
          <span class="text-wrap">{{text()}}</span>
        </div>
      </div>
    </div>
}
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiToastComponent implements OnInit {

private _uiToastService: UiToastService = inject(UiToastService);

protected active = signal(false);
protected disable = signal(true);
protected type = signal(UI_TOAST_TYPE.SUCCESS);
protected text = signal('Mensagem enviada com sucesso!');

ngOnInit(): void {
  this._setConfigEvent();
} 

/**************** METHODS PRIVATE ****************/

private _setConfigEvent(): void {
  this._uiToastService.getEvent().subscribe(res => {
    if(!this.active() && res.message) {
      this.type.set(res.type);
      this.text.set(res.message);
      this._timeMessage();
    }
  });
}

private _timeMessage(time: number = 3000): void {
  this.disable.set(false);
  this.active.set(true);
  setTimeout(() => {
    this.active.set(false);
  }, time);
  setTimeout(() => {
    this.disable.set(true);
  }, (time + 1000));
}

}
