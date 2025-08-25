import { Component, OnInit } from '@angular/core';
import { PoliciaisService, Policial } from '../../services/policiais.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-policiais',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './lista-policiais.component.html',
  styleUrls: ['./lista-policiais.component.css']
})
export class ListaPoliciaisComponent implements OnInit {
  policiais: Policial[] = [];
  mensagem = '';
  displayedColumns = ['rg_civil', 'rg_militar', 'cpf', 'data_nascimento', 'matricula', 'acoes'];
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
    this.mensagem = '';
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
                if (!data2 || data2.length === 0) {
                  this.mensagem = 'Nenhum policial encontrado para o termo informado.';
                } else {
                  this.mensagem = '';
                }
              },
              error: err2 => {
                this.mensagem = 'Erro ao buscar por RG. Tente novamente.';
                console.error('Erro ao buscar por RG:', err2);
              }
            });
          }
        },
        error: err => {
          this.mensagem = 'Erro ao buscar por CPF. Tente novamente.';
          console.error('Erro ao buscar por CPF:', err);
        }
      });
    } else {
      this.service.listarPoliciais().subscribe({
        next: data => {
          this.policiais = data;
          if (!data || data.length === 0) {
            this.mensagem = 'Nenhum policial cadastrado.';
          } else {
            this.mensagem = '';
          }
        },
        error: err => {
          this.mensagem = 'Erro ao carregar policiais. Tente novamente.';
          console.error('Erro ao carregar policiais:', err);
        }
      });
    }
  }
  limparFiltro() {
    this.filtroForm.reset();
    this.carregar();
  }

  deletar(id: number) {
    if (confirm('Tem certeza que deseja deletar?')) {
      this.service.deletarPolicial(id).subscribe({
        next: () => this.carregar(),
        error: err => {
          this.mensagem = 'Erro ao deletar policial. Tente novamente.';
          console.error('Erro ao deletar policial:', err);
        }
      });
    }
  }

  editar(policial: Policial) {
  }
}