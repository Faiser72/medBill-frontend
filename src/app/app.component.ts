import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mbs';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private spiner: NgxSpinnerService
  ) { }

  text: string;
  startSpinner(text: string) {
    this.text = text;
    this.spiner.show();
  }
  stopSpinner() {
    this.spiner.hide();
  }

  switchMode(isDarkMode: boolean) {
    const hostClass = isDarkMode ? "theme-dark" : "theme-light";
    this.renderer.setAttribute(this.document.body, "class", hostClass);
    // this.isDark = isDarkMode;  
  }
}

