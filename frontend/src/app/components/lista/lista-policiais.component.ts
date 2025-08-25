import { Component, OnInit } from '@angular/core';
import { PoliciaisService, Policial } from '../../services/policiais.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-policiais',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './lista-policiais.component.html',
  styleUrls: ['./lista-policiais.component.css']
})
export class ListaPoliciaisComponent implements OnInit {
  policiais: Policial[] = [];
  mensagem = '';
  displayedColumns = ['rg_civil', 'rg_militar', 'cpf', 'data_nascimento', 'matricula'];
  filtroForm;

  constructor(private service: PoliciaisService, private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      termo: ['']
    });
  }

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    const termo = this.filtroForm.value.termo?.trim();
    if (termo) {
      // Tenta buscar por CPF primeiro, se não encontrar, busca por RG
      this.service.listarPoliciais({ cpf: termo }).subscribe({
        next: data => {
          if (data && data.length > 0) {
            this.policiais = data;
            this.mensagem = '';
          } else {
            // Se não achou por CPF, tenta por RG
            this.service.listarPoliciais({ rg: termo }).subscribe({
              next: data2 => {
                this.policiais = data2;
                this.mensagem = '';
              },
              error: err2 => { this.mensagem = err2; }
            });
          }
        },
        error: err => { this.mensagem = err; }
      });
    } else {
      this.service.listarPoliciais().subscribe({
        next: data => { this.policiais = data; this.mensagem = ''; },
        error: err => { this.mensagem = err; }
      });
    }
  }
  limparFiltro() {
    this.filtroForm.reset();
    this.carregar();
  }
}