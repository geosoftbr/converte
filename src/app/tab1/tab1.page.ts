import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { DolarTurismoService } from '../dolar-turismo.service';
import { NewsIntroService } from '../news-intro.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [
    NewsIntroService
  ]
})
export class Tab1Page implements OnInit{

  ask:number;
  create_date:string;
  varBid:number;
  pctChange:number;
  name:string;
  color:string;
  icon:string;
  tipoTran:any;
  valEntrada:number;
  valDol: any;
  taxas: any;
  firstVal: number;
  newVal: any;
  errMsg: string;
  subErr: string;
  sobedesce:string;
  
  public trType:any;
  public valUs:any;
  public refresher;
  public isRefreshing: boolean = false;
  
    constructor(
      public dolarTurismo: DolarTurismoService, 
      private alertController: AlertController, 
      private NewsIntro: NewsIntroService,
      
      ) {

      }
    
    cotacao:string;
  
    ngOnInit() {
     
      this.getDolarTurismo();

      console.log("indo buscar noticia...")

      this.NewsIntro.getNews().subscribe(
        data=>{
          console.log("Tentando...");
          console.log(data);
        },error => {
          console.log("falhando...");
          console.log(error);
        }
        

      )

  
    }
    doRefresh(refresher) {
      console.log('Atualizando Dolar Turismo');
      setTimeout(() => {
        this.refresher = refresher;
        this.isRefreshing = true;
        this.getDolarTurismo();
      },1000);

    }

    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Vish!',
        subHeader: this.subErr,
        message: this.errMsg,
        buttons: ['OK']
      });
  
      await alert.present();
    }
    getDolarTurismo(){ //criada para ser reutilizada internamente.
      console.log("[tab1.page.ts - ngOnInit] - Limpando campo ASK")
      this.ask = 0;
      console.log("[tab1.page.ts - ngOnInit] - Limpando campo created_date")
      this.create_date = "";
  
      this.dolarTurismo.getRemoteData().subscribe(
        data=>{
          this.parseJson(data);
  
          if(this.ask==null){
            this.subErr = 'Erro de Conexão'
            this.errMsg = 'Não consegui pegar o valor do Dolar Turismo. \n Tente de novo mais tarde'
            this.presentAlert()
            console.log("[news.page.ts - ngOnInit] - Erro na consulta do dólar turismo")
          } else{
            console.log("[news.page.ts - ngOnInit] - Cotação atualizada em: "+ this.create_date)
            console.log ("[news.page.ts - ngOnInit] - Pronto para converter por "+ this.ask)
            
          }
          if (this.isRefreshing){
            this.refresher.target.complete();
            this.isRefreshing = false;
          }
        }, error =>{
          console.log(error);
  
          if (this.isRefreshing){
            this.refresher.target.complete();
            this.isRefreshing = false;
          }
          
        }
      );
    }
    
    
    parseJson(data: Object) {
      {
          let jsonArray = data[0];
  
          this.ask = jsonArray.ask;
          this.create_date = jsonArray.create_date;
          this.varBid = jsonArray.varBid;
          this.name = jsonArray.name;
          this.pctChange = jsonArray.pctChange;
  
          var d = this.varBid;
          if (d > 0){
            this.color = "danger";
            this.icon = "arrow-up-sharp";
            this.sobedesce = "sobe";
          } 
          else if(d < 0) {
            this.color = "success";
            this.icon = "arrow-down-sharp";
            this.sobedesce = "desce"
          }
          else {
            this.color = "primary";
            this.icon = "ellipse-sharp";
            this.sobedesce = "permanece estável"
          }
  
      }
      //let dol: HTMLElement = document.getElementById('cotacao');
      console.log('==> '+this.ask.toString())
      //dol.innerHTML = this.ask.toString();
    }
}
