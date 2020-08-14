import { Component } from '@angular/core';
import { DolarTurismoService } from '../dolar-turismo.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ask:number;
  create_date:string;
  varBid:number;
  name:string;
  color:string;
  tipoTran:any;
  valEntrada:number;
  valDol: any;
  taxas: any;
  firstVal: number;
  newVal: any;
  errMsg: string;
  subErr: string;
  
  public trType:any;
  public valUs:any;
  public refresher;
  public isRefreshing: boolean = false;
  
  tipos = [
    { nome: 'Dinheiro' },
    { nome: 'Cartão' },
    { nome: 'Entrega no Brasil' },
  ];
  
  //trType: string;
  
  txMoney = 0.011; // 1,1%
  
    constructor(public dolarTurismo: DolarTurismoService, private alertController: AlertController) {}
  
    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Vish!',
        subHeader: this.subErr,
        message: this.errMsg,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  
    doRefresh(refresher) {
      console.log('Atualizando Dolar Turismo');
      setTimeout(() => {
        this.refresher = refresher;
        this.isRefreshing = true;
        this.getDolarTurismo();
      },1000);
    }
  
    ngOnInit() {
      this.getDolarTurismo();
  
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
            console.log("[tab1.page.ts - ngOnInit] - Erro na consulta do dólar turismo")
          } else{
            console.log("[tab1.page.ts - ngOnInit] - Cotação atualizada em: "+ this.create_date)
            console.log ("[tab1.page.ts - ngOnInit] - Pronto para converter por "+ this.ask)
            
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
  
          var d = this.varBid;
          if (d > 0){
            this.color = "danger"
          } 
          else if(d < 0) {
            this.color = "success";
          }
          else {
            this.color = "primary";
          }
  
        }
  
    }
    onChange(){
      var txt: any
  
      if(this.trType==null){
        this.subErr = 'Selecione a Forma de Pagamento!'
        this.errMsg = 'Não consigo fazer nada se você não selecionar a forma de pagamento!'
        this.presentAlert()
      }else{
        txt = this.trType;
      }
      
  
      let vBR: HTMLElement = document.getElementById('valBr');
  
      //console.log("[tab1.page.ts - onChange] - yada valUs => "+ this.valUs);
  
      //this.getDolarTurismo(); 
  
      this.tipoTran = txt.nome;
  
      //pega valor digitado em Dolar
      //let vDol: HTMLElement = document.getElementById('valUs').value;
      let vDol = (<HTMLInputElement>document.getElementById('valUs')).value;
      
      if(vDol == ""){
        this.valDol = 0;
        console.log("Erro " + vDol);
      }else{
        this.valDol = vDol;
        console.log("Passou " + vDol);
      }
  
      this.valEntrada = parseFloat(this.valDol);
      this.newVal = this.dolarTurismo.convertValue(this.tipoTran,this.valEntrada, this.ask );
      vBR.innerHTML = this.newVal;
        
    }
  
    abrepesquisa(){
      window.open("https://forms.gle/yfY4kFpicVHFo5ACA","_blank")
    }
  
    converte(){
      console.log("Entrando na função Converte")
      var txt: any
  
      if(this.trType==null){
        this.subErr = 'Selecione a Forma de Pagamento!'
        this.errMsg = 'Não consigo fazer nada se você não selecionar a forma de pagamento!'
        this.presentAlert()
      }else{
        txt = this.trType;
      }
      
      let vBR: HTMLElement = document.getElementById('valBr');
      let vDol = (<HTMLInputElement>document.getElementById('valUs')).value;

      //this.getDolarTurismo();
  
      this.tipoTran = txt.nome;
  
      console.log("[tab1.page.ts - converte] - yada valUs => "+ vDol);
    
      if(vDol==""){
        this.valDol = 0;
        this.subErr = 'Digite o valor em Dolar...'
        this.errMsg = '...senão eu não posso converter!'
        this.presentAlert()
      }else{
        this.valDol = vDol;
      }
  
      this.valEntrada = parseFloat(this.valDol);
      this.newVal = this.dolarTurismo.convertValue(this.tipoTran,this.valEntrada, this.ask );
      vBR.innerHTML = this.newVal;
      
    }

}
