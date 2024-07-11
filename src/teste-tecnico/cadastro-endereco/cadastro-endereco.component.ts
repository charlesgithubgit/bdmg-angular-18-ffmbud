import { Component } from '@angular/core';
import { Endereco } from '../Model/endereco';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CepService } from '../Service/service-cep';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-endereco',
  standalone: true,
  imports:[
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask(),
  ]
,
  templateUrl: './cadastro-endereco.component.html',
  styleUrl: './cadastro-endereco.component.css'
})
export class CadastroEnderecoComponent {
  enderecoForm: FormGroup;
  endereco!: Endereco;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: CepService
  ) {
    this.enderecoForm = this.formBuilder.group({
      cep: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      logradouro: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
      ibge: [{ value: '', disabled: true }],
      gia: ['', Validators.required],
      ddd: ['', Validators.required],
      siafi: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    const enderecoSalvo = localStorage.getItem('endereco');
    if (enderecoSalvo) {
      this.endereco = JSON.parse(enderecoSalvo);
      this.enderecoForm.patchValue(this.endereco);
    }else{
      this.buscarEndereco();
    }
  }

  onSubmit(): void {
    if(this.enderecoForm.valid){
      localStorage.setItem('endereco', JSON.stringify(this.enderecoForm.value));
      alert("Formulário salvo com sucesso no localstorage!");
    }else{
      alert("Preencha todos os campos!");
    }
  }

  buscarEndereco(): void {
      this.enderecoService.buscarEndereco().subscribe({
        next: (data: Endereco) => {
          this.enderecoForm.patchValue(data);
        },
        error: () => {
          alert('Erro no serviço ao buscar endereço');
        }
      });
  }
}
