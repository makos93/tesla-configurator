import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TeslaConfiguratorService } from '../../tesla-configurator.service';
import { ITeslaInfo } from '../../app.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent implements OnInit{

  packagePrice = 1000;

  teslaInfoModel?: ITeslaInfo;
  totalPrice: number = 0;

  isTowHitchIncluded: boolean = false;
  isYokeIncluded: boolean = false;

  constructor(private _teslaConfiguratorService: TeslaConfiguratorService){

  }

  private _setTotalPrice() {
    if(!this.teslaInfoModel){
        return;
    }

    const yokePrice = this.isYokeIncluded ? 1000 : 0;
    const towHitchPrice = this.isTowHitchIncluded? 1000 : 0;

    this.totalPrice =  this.teslaInfoModel.configPrice + this.teslaInfoModel.colorPrice + yokePrice + towHitchPrice;
  }

  ngOnInit(): void {
    this._teslaConfiguratorService.
    getSummaryInfo()
    .subscribe((teslaInfo) =>{
        this.teslaInfoModel = teslaInfo
        this._setTotalPrice();
      }
    );

   this.isTowHitchIncluded = localStorage.getItem('towHitch') !== null && localStorage.getItem('towHitch') === 'true';
   this.isYokeIncluded = localStorage.getItem('yoke') !== null && localStorage.getItem('yoke') === 'true';
  }
}
