import { Routes } from '@angular/router';
import { StepOneComponent } from './app/step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';

export const routes: Routes = [
    { path: 'stepone', component: StepOneComponent },
    { path: 'steptwo', component: StepTwoComponent },
    { path: '', component: StepOneComponent },
];
