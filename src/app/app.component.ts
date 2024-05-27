import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TeslaConfiguratorService } from './tesla-configurator.service';
import { GuardStateService } from './guard-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, HttpClientModule, RouterModule, CommonModule],
  providers: [TeslaConfiguratorService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  name = 'Angular';
  title = 'tesla-configurator';


  get isTeslaImageVisible(){
    return localStorage.getItem('model') != null;
  } 
  
  constructor(public _teslaConfiguratorService: TeslaConfiguratorService, public _guardStateService: GuardStateService){
  }

  ngOnInit(): void {
    const model = localStorage.getItem('model') as string;
    const color = localStorage.getItem('color') as string;
    const configId = localStorage.getItem('configId')

    if(model != null  && color != null){
      this._teslaConfiguratorService.setTeslaImageUrl(model, color);
      this._guardStateService.setStepTwoCanActivate(true);
    }

    if(configId != null && configId != '0'){
      this._guardStateService.setStepThreeCanActivate(true);
    }
  }
}
