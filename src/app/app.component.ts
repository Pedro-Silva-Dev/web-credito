import { UiModalComponent } from './shared/components/ui-modal/ui-modal.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiToastComponent } from './shared/components/ui-toast/ui-toast.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    UiToastComponent,
    UiModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web-credito';
}
