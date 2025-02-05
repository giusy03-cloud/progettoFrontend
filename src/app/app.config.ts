import { ApplicationConfig } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),],  // Aggiungi il componente Navbar alla configurazione
};
