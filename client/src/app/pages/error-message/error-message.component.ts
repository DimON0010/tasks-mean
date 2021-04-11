import { Component, Input, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'error-message-component',
  templateUrl: './error-message.component.html',
  providers: [MessageService]
})
export class ErrorMessageComponent implements OnInit {

  @Input() isActive = false;
  @Input() errorMessage: string = null;

  constructor(private primengConfig: PrimeNGConfig) { }

  hideError(): void {
    this.isActive = false;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
