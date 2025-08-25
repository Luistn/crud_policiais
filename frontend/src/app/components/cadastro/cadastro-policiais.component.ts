import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PoliciaisService } from '../../services/policiais.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { showSwal } from '../../share/swal.util';

@Component({
  selector: 'app-cadastro-policiais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './cadastro-policiais.component.html',
  styleUrls: ['./cadastro-policiais.component.css']
})
export class CadastroPoliciaisComponent {
  mensagem = '';
  erro = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: PoliciaisService) {
    this.form = this.fb.group({
      rg_civil: ['', Validators.required],
      // RG_MILITAR minimo de 3 numeros 
      rg_militar: ['', [Validators.minLength(3), Validators.required, Validators.pattern(/^\d{11}$/)]], 
      cpf: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      matricula: ['', Validators.required]
    });
  }

  // modal usado do showSwal, coloquei na pasta Share. 

  onSubmit() {
    if (this.form.valid) {
      this.service.cadastrarPolicial(this.form.value).subscribe({
        next: () => {
          showSwal({
            title: 'Policial cadastrado com sucesso!',
            icon: 'success',
            position: 'top-end',
            timer: 1500
          });
          this.form.reset();
        },
        error: err => {
          showSwal({
            title: err,
            icon: 'error',
            position: 'top-end',
            timer: 2000
          });
        }
      });
    }
  }
}