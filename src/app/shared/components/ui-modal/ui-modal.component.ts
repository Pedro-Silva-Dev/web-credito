import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { MODAL_SIZE } from '../../enums/modal-size.enum';
import { UiModalService } from '../../services/ui-modal.service';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'ui-modal',
  imports: [
      CommonModule,
      FeatherModule,
  ],
  template: `
    <dialog class="modal {{isOpen() ? 'modal-open' : ''}}">
      <div class="modal-box p-0 {{size}}">
        @if(title) {
          <div class="border-b-[1px] border-b-slate-600/20">
                <div class="p-4 flex justify-between">
                    <h3 class="text-xl">{{titleText}}</h3>
                    <i-feather (click)="closeModal()" class="*:w-[1.5rem] *:h-[1.5rem] text-slate-600 cursor-pointer hover:*:text-primary" [name]="icon"></i-feather>
                </div>
            </div>
          }
          <div class="p-4">
            <ng-container #modal></ng-container>
          </div>
      </div>
    </dialog>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class UiModalComponent implements OnInit, OnDestroy {

  @ViewChild('modal', {read: ViewContainerRef}) modal!: ViewContainerRef;

  protected title: boolean = false;
  protected size: MODAL_SIZE = MODAL_SIZE.MEDIUM;
  protected titleText: string = 'Título';

  private _uiModalService: UiModalService = inject(UiModalService);
  private _unsubscribe!: Unsubscribable;

  protected icon = `x-circle`;
  protected isOpen = signal(false);

  ngOnInit(): void {
      this._setModalSideEvent();
  }

  ngOnDestroy(): void {
    this._unsubscribe?.unsubscribe();
  } 


  public closeModal(): void {
    this._uiModalService.closeModal();
    this.isOpen?.set(false);
  }

  private _setModalSideEvent(): void {
    this._unsubscribe = this._uiModalService.getModalEvent().subscribe(config => {
      if(config) {
        if(config.title) {
          this.titleText = config.title;
          this.title = true;
        }
        this.size = config.size;
        this.isOpen.set(true);
        this.modal.createEmbeddedView(config.template);
      }else {
          this.modal.clear();
          this.isOpen.set(false);
      }
    });
  }


}
