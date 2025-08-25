import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CadastroPoliciaisComponent } from './components/cadastro/cadastro-policiais.component';
import { ListaPoliciaisComponent } from './components/lista/lista-policiais.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: CadastroPoliciaisComponent },
      { path: 'lista', component: ListaPoliciaisComponent }
    ])
  ]
};