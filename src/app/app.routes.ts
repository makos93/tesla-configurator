import { Routes } from '@angular/router';
import { StepOneComponent } from './app/step-one/step-one.component';
import { StepTwoComponent } from './app/step-two/step-two.component';
import { StepThreeComponent } from './app/step-three/step-three.component';
import { StepTwoGuard } from './app/step-two.guard';
import { StepThreeGuard } from './app/step-three.guard';

export const routes: Routes = [
    { path: 'stepone', component: StepOneComponent},
    { path: 'steptwo', component: StepTwoComponent, canActivate: [StepTwoGuard]},
    { path: 'stepthree', component: StepThreeComponent, canActivate: [StepThreeGuard]},
    { path: '', pathMatch:'full', redirectTo:'stepone' },
    { path: '**', component: StepOneComponent}
];
