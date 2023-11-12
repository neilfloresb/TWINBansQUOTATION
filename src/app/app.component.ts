import { Component, HostBinding, Input } from '@angular/core';
//import { Input } from 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostBinding('attr.id')
  appId = 'twinbee-app';
  title = 'twinbeeNGRXver2021march';
}
