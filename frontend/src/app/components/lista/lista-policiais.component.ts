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
      cpf: [''],
      rg: ['']
    });
  }

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    const filtro: any = {};
    const cpf = this.filtroForm.value.cpf?.trim();
    const rg = this.filtroForm.value.rg?.trim();
    if (cpf && rg) {
      // Filtra por ambos: retorna apenas quem tem CPF E RG iguais aos informados
      this.service.listarPoliciais({ cpf, rg }).subscribe({
        next: data => {
          // Filtra localmente para garantir ambos
          this.policiais = data.filter(p => p.cpf === cpf && (p.rg_civil === rg || p.rg_militar === rg));
          this.mensagem = '';
        },
        error: err => { this.mensagem = err; }
      });
    } else if (cpf) {
      this.service.listarPoliciais({ cpf }).subscribe({
        next: data => { this.policiais = data; this.mensagem = ''; },
        error: err => { this.mensagem = err; }
      });
    } else if (rg) {
      this.service.listarPoliciais({ rg }).subscribe({
        next: data => { this.policiais = data; this.mensagem = ''; },
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