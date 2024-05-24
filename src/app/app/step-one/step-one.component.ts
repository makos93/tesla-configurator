import { Component, OnInit } from '@angular/core';
import { TeslaConfiguratorService } from '../../tesla-configurator.service';
import { ITeslaColor, ITeslaModel } from '../app.model';
import { CommonModule } from '@angular/common';
import { every, first, pipe } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [TeslaConfiguratorService],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent implements OnInit {

  colorDropdownOptions: ITeslaColor[] = [];
  modelDropdownOptions: ITeslaModel[] = [];

  selectedModelOption?: string = 'default';
  selectedColorOption?: string = '';

  teslaImageUrl: string = '';

  constructor(private _teslaConfiguratorService: TeslaConfiguratorService){
  }

  onModelDropDownChanged($event: Event) {
    if(this.selectedModelOption === 'default'){
      return;    
    }

    const selectedModel = this.modelDropdownOptions.find((model) =>model.code === this.selectedModelOption) as ITeslaModel;
    this.colorDropdownOptions = selectedModel.colors;
    this.selectedColorOption = this.colorDropdownOptions[0].code;

    this.setTeslaImageUrl();
   
  }
  
  onColorDropDownChanged($event: Event) {
    this.setTeslaImageUrl();
  }

  setTeslaImageUrl(): void{
    this.teslaImageUrl = `https://interstate21.com/tesla-app/images/${this.selectedModelOption}/${this.selectedColorOption}.jpg`
  }

  ngOnInit(): void {
    this._teslaConfiguratorService.getModels().pipe(
      first())
      .subscribe((modelArray: ITeslaModel[]) => {
       this.modelDropdownOptions = modelArray;
    });
  }
}
