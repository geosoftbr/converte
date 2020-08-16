import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsIntroService {

  constructor(public http: HttpClient) {
    console.log('[news-intro.service.ts] Buscando notícias relacionadas');
   }

   getNews(){
     return this.http.get("https://news.google.com/rss/search?q=dolar&hl=pt-BR&gl=BR&ceid=BR:pt-419");
   };
}
