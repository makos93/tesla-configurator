import { Component, OnInit } from '@angular/core';
import { ITeslaConfig, ITeslaModel, ITeslaModelOption } from '../app/app.model';
import { HttpClientModule } from '@angular/common/http';
import { TeslaConfiguratorService } from '../tesla-configurator.service';
import { first, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  providers: [TeslaConfiguratorService],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent implements OnInit {

  modelConfigs: ITeslaConfig[] = [];

  selectedModelConfigId: number = 0;
  towHichCheckbox: boolean = false;
  yokeCheckbox: boolean = false;

  range?: number;
  speed?: number;
  price?: number;

  constructor(private _teslaConfiguratorService : TeslaConfiguratorService){

  }

  onModelConfigChange($event: Event) {
    if(+this.selectedModelConfigId === 0){
      return;
    }
    const selectedModelConfig = this.modelConfigs.find((config) => config.id === +this.selectedModelConfigId) as ITeslaConfig;

    this.range = selectedModelConfig.range;
    this.speed = selectedModelConfig.speed;
    this.price = selectedModelConfig.price;
  }

  ngOnInit(): void {
   this._teslaConfiguratorService.getOptions('S').pipe(
    first())
    .subscribe((options) =>{
      this.modelConfigs = options.configs;
      this.towHichCheckbox = options.towhitch;
      this.yokeCheckbox = options.yoke;
  });
  }
}
