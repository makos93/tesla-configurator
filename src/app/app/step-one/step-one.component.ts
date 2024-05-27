import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaConfiguratorService } from '../../tesla-configurator.service';
import { ITeslaColor, ITeslaModel } from '../app.model';
import { CommonModule } from '@angular/common';
import { every, first, pipe } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { GuardStateService } from '../../guard-state.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent implements OnInit {

  colorDropdownOptions: ITeslaColor[] = [];
  modelDropdownOptions: ITeslaModel[] = [];

  selectedModelOption: string = 'default';
  selectedColorOption: string  = '';

  teslaImageUrl: string = '';

  constructor(private _teslaConfiguratorService: TeslaConfiguratorService, private _guardStateService: GuardStateService){
  }

  onModelDropDownChanged($event: Event) {
    if(this.selectedModelOption === 'default'){
      localStorage.clear();
      this._guardStateService.setStepTwoCanActivate(false);
      this._guardStateService.setStepThreeCanActivate(false);
      return;    
    }

    const selectedModel = this.modelDropdownOptions.find((model) =>model.code === this.selectedModelOption) as ITeslaModel;
    this.colorDropdownOptions = selectedModel.colors;
    this.selectedColorOption = this.colorDropdownOptions[0].code;
   
    this._teslaConfiguratorService.setTeslaImageUrl(this.selectedModelOption, this.selectedColorOption);
    this._guardStateService.setStepTwoCanActivate(true);
   
    localStorage.setItem('model', this.selectedModelOption); 
    localStorage.setItem('color', this.selectedColorOption);
    localStorage.setItem('configId', '0');
    localStorage.setItem('towHitch', 'false');
    localStorage.setItem('yoke', 'false');
  }
  
  onColorDropDownChanged($event: Event) {
    this._teslaConfiguratorService.setTeslaImageUrl(this.selectedModelOption, this.selectedColorOption);
    
    localStorage.setItem('color', this.selectedColorOption);
  }

  ngOnInit(): void {
    this._teslaConfiguratorService.getModels().pipe(
      first())
      .subscribe((modelArray: ITeslaModel[]) => {
       this.modelDropdownOptions = modelArray;
       if(localStorage.getItem('model') != null && localStorage.getItem('color') != null){
          this.selectedModelOption = localStorage.getItem('model') as string;
          const selectedModel = this.modelDropdownOptions.find((model) =>model.code === this.selectedModelOption) as ITeslaModel;
          this.colorDropdownOptions = selectedModel.colors; 
          this.selectedColorOption = localStorage.getItem('color') as string;
        }
    });
  }
}
