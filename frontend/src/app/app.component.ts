import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroPoliciaisComponent } from './components/cadastro/cadastro-policiais.component';
import { ListaPoliciaisComponent } from './components/lista/lista-policiais.component';
@Component({
  selector: 'app-root',
  imports: [CadastroPoliciaisComponent, ListaPoliciaisComponent],
  template: `
            <app-cadastro-policiais />,
              <app-lista-policiais />
`

})
export class AppComponent {
}
