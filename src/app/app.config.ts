import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GuardStateService } from './guard-state.service';
import { TeslaConfiguratorService } from './tesla-configurator.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), GuardStateService, TeslaConfiguratorService]
};
