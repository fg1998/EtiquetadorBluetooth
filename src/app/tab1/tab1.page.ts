import { Component, ViewChild } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { DatePipe } from '@angular/common';
import { Produto } from '../interfaces/produto';
import { Etiqueta } from '../interfaces/etiqueta';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  produtos$: Produto[] = [];
  produtoLista$: Produto[] = [];
  etiqueta = {} as Etiqueta;
  searchTerm: String = '';
  filterItems: any;

  handleRefresh(event: any) {
    this.searchTerm = '';
    this.getProdutos();

    event.target.complete();
  }

  constructor(
    private produtoService: ProdutoService,
    private datePipe: DatePipe,
    private alertController: AlertController,
    private storage: Storage,
    private setupservice: SetupService
  ) {}

  ionViewWillEnter() {
    this.getProdutos();
    this.searchTerm = '';
  }

  async showEdit(produto: Produto) {
    const alert = await this.alertController.create({
      header: 'Editar produto',
      buttons: [
        {
          text: 'Confirma',
          role: 'confirm',
          handler: (data) => {
            const _produto: Produto = {
              recno: data.recno,
              nome: data.nome,
              dias: data.dias,
            };
            this.confirmUpdate(_produto);

            const prodRet$ = this.produtoService.getAll();
          },
        },
        {
          text: 'Cancela',
          role: 'cancel',
          handler: () => {
            console.log('Cancelou...');
          },
        },
      ],
      inputs: [
        {
          label: 'ID',
          value: produto.recno,
          name: 'recno',
          disabled: true,
        },
        {
          label: 'Nome',
          value: produto.nome,
          name: 'nome',
        },
        {
          value: Number(produto.dias),
          type: 'number',
          min: 1,
          max: 100,
          name: 'dias',
        },
      ],
    });
    await alert.present();
  }

  async showDelete(produto: Produto) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'A remoção de um produto não pode ser desfeita',
      buttons: [
        {
          text: 'Confirma',
          role: 'confirm',
          handler: (data) => {
            this.confirmDelete(produto);
          },
        },
        {
          text: 'Cancela',
          role: 'cancel',
          handler: () => {
            console.log('Cancelou...');
          },
        },
      ],
    });
    await alert.present();
  }

  filterItens() {

    this.produtoLista$ = this.produtos$.filter((produto) => {

      return (
        produto.nome.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1
      );
    });
  }

  getProdutos(): void {
    this.produtoLista$ = this.produtoService
      .getAll()
      .sort((a, b) => a.nome.localeCompare(b.nome));
    this.produtos$ = this.produtoLista$
  }

  public confirmDelete(produto: Produto) {
    //console.log('Confirmou deletar dentro do métodos');
    //console.log(produto)
    //this.produtoService.delete(produto);
  }

  public confirmUpdate(produto: Produto) {
    //console.log("confirmou Editar");
    //this.produtoService.update(produto);
    //this.getProdutos()
  }

  async imprime(produto: Produto) {}

  async addDays(days: number) {
    var dataManipulacao = await this.storage.get('dataManipulacao');
    var dataEN =
      dataManipulacao.substring(3, 5) +
      '/' +
      dataManipulacao.substring(0, 2) +
      '/' +
      dataManipulacao.substring(6, 10);

    var dataValidade = new Date(dataEN);
    dataValidade.setDate(dataValidade.getDate() + days);
    //return dataValidade;
    return this.datePipe.transform(dataValidade, 'dd/MM/yyyy')!;
  }
}
