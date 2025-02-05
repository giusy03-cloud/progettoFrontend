import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),   // Configura il routing
    provideHttpClient(),     // Configura HttpClient
  ],
}).catch(err => console.error(err));
