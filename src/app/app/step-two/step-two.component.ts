import { Component, OnInit } from '@angular/core';
import { ITeslaConfig, ITeslaModel, ITeslaModelOption } from '../app.model';
import { HttpClientModule } from '@angular/common/http';
import { TeslaConfiguratorService } from '../../tesla-configurator.service';
import { config, first, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuardStateService } from '../../guard-state.service';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent implements OnInit {

  modelConfigs: ITeslaConfig[] = [];

  selectedModelConfigId: number = 0;
  isTowHitchEnabled: boolean = false;
  isYokeEnabled: boolean = false;

  isTowHitchChecked: boolean = false;
  isYokeChecked: boolean = false;

  range?: number;
  speed?: number;
  price?: number;

  constructor(private _teslaConfiguratorService : TeslaConfiguratorService, private _guardStateService: GuardStateService){

  }

  onModelConfigChange($event: Event) {
    localStorage.setItem('configId', this.selectedModelConfigId.toString());

    if(+this.selectedModelConfigId === 0){
      this._guardStateService.setStepThreeCanActivate(false);
      return;
    }

    this._guardStateService.setStepThreeCanActivate(true);
    this._setConfigData();
  }

  onTowHitchCheckBoxChange($event: Event) {
    localStorage.setItem('towHitch', this.isTowHitchChecked.toString());
  }

  onYokeCheckBoxChange($event: Event) {
    localStorage.setItem('yoke', this.isYokeChecked.toString());
  }

  private _setConfigData() {
    const selectedModelConfig = this.modelConfigs.find((config) => config.id === +this.selectedModelConfigId) as ITeslaConfig;

    this.range = selectedModelConfig.range;
    this.speed = selectedModelConfig.speed;
    this.price = selectedModelConfig.price;
  }

  private _initControls() {
    if(localStorage.getItem('configId') !== null){
        this.selectedModelConfigId = +localStorage.getItem('configId')!;
    }

    if(this.selectedModelConfigId !== 0){
      this._setConfigData();
    }

    if(this.isYokeEnabled){
      this.isYokeChecked = localStorage.getItem('yoke') != null && localStorage.getItem('yoke') === 'true';
    }

    if(this.isTowHitchEnabled){
      this.isTowHitchChecked = localStorage.getItem('towHitch') != null && localStorage.getItem('towHitch') === 'true';
    }
  }

  ngOnInit(): void {
    const modelCode = localStorage.getItem('model')!;

    this._teslaConfiguratorService.getOptions(modelCode).pipe(
      first())
      .subscribe((options) =>{
        this.modelConfigs = options.configs;
        this.isTowHitchEnabled = options.towHitch;
        this.isYokeEnabled = options.yoke;
        this._initControls();
    });
  }


}
