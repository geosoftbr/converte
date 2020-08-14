import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DolarTurismoService {
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
  public valtxt: string;

  constructor(public http: HttpClient,  private alertController: AlertController) {     

    console.log('[dolar-Turismo.service.ts] Buscando cotação do dolar turismo');
  
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
    getRemoteData(){
      //mudar para http://economia.awesomeapi.com.br/USD-BRLT/1?format=json quando for buscar o valor remoto.
      //fazer seleção automática, atualização do json e identificação de online e offline
    
     return this.http.get('https://economia.awesomeapi.com.br/USD-BRLT/1?format=json').pipe(

     );
      
      //return this.http.get('assets/data/dolar.json'); //Local
    };

    getDolarTurismo(){ //criada para ser reutilizada internamente - funcão com retorno de valor, diferente da contida no arquivo tab1.page.ts
      
      console.log("[dolar-turismo.service.ts - ] - Limpando campo ASK")
      this.ask = 0;
      console.log("[dolar-turismo.service.ts - ] - Limpando campo created_date")
      this.create_date = "";
  
      this.getRemoteData().subscribe(
        data=>{
          this.parseJson(data);
  
          if(this.ask==null){
            this.subErr = 'Erro de Conexão'
            this.errMsg = 'Não consegui pegar o valor do Dolar Turismo. \n Tente de novo mais tarde'
            //this.presentAlert()
            console.log("[dolar-turismo.service.ts - getRemoteData] - Erro na consulta do dólar turismo")
          } else{
            console.log("[dolar-turismo.service.ts - getRemoteData] - Cotação atualizada em: "+ this.create_date)
            console.log ("[dolar-turismo.service.ts - getRemoteData] - Pronto para converter por "+ this.ask)
            
            this.firstVal = this.ask;
            
            this.valtxt = this.firstVal.toString();
            console.log("Result #1: ---- " + this.valtxt);
          }
          console.log("Result #2: ---- " + this.valtxt); 

        }, error =>{
          console.log(error);
          
        }
      );
      console.log("Result #3: ---- " + this.valtxt);
      return this.valtxt;
    }
    parseJson(data: Object) {
      {
          let jsonArray = data[0];
  
          this.ask = jsonArray.ask;
          this.create_date = jsonArray.create_date;
          this.varBid = jsonArray.varBid;
          this.name = jsonArray.name;
  
          this.firstVal = this.ask;
          this.valtxt = this.firstVal.toString();
          console.log ('==== > '+this.ask.toString());
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

    convertValue(transType:string, valIn:number, dolIn:any){
      //pega o valor de valIn e faz o calculo da conversão e converte usando o valor do dolar que vem pela variavel dolIn
      console.log("[dolar-turismo-service.ts] entrei na funcao para converter os valores! ")
      var valOut: any;
      var dolInNum: number;
      var valDirect: number;
      var transType: string;
      var taxes:number;
      var valTaxMoney: number;
      var valTaxCredit: number;
      var valTaxDelivery: number;
      var txtPay: string;
      var valTax:number;
      
      valTaxMoney = 0.011; // 1,1%
      valTaxCredit = 0.0638; // 6,38%
      valTaxDelivery = 0.6; // até 60%
      
      dolInNum = parseFloat(dolIn);

      if (transType=="Dinheiro"){
        taxes = valTaxMoney;
        txtPay = "Dinheiro";
      }else if (transType=="Cartão"){
        taxes = valTaxCredit;
        txtPay = "Cartão de Crédito";
      }else if(transType=="Entrega no Brasil"){
        taxes = valTaxDelivery;
        txtPay = "Entrega";
      } else if (transType==null){ //default = dinheiro
        taxes = valTaxMoney;
        txtPay = "Dinheiro";        
      }
      
      console.log('[dolar-turismo-service.ts] Transação selecionada: '+txtPay); 
      //default = dinheiro

      valDirect = valIn * dolInNum;
      valTax = valDirect * taxes;
      valOut = (valTax + valDirect);
      valOut = valOut.toFixed(2);
      console.log("[dolar-turismo-service.ts] Imposto pago: "+ valTax.toFixed(2))
      //<small>Valor do imposto pago: R$ {{ taxas }}</small>
      let vTax: HTMLElement = document.getElementById('valImposto')
      vTax.innerHTML = "<small>Valor do imposto pago: R$ "+ valTax.toFixed(2) +"</small>"
      console.log("[dolar-turismo-service.ts] Conversão com taxa ("+ txtPay +"): "+ valOut)
      return valOut;
    }

    getFieldVals(fieldId:string): number {
     var num: number


       return num
    }

 }

  