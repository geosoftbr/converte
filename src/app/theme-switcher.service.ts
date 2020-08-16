import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomController } from '@ionic/angular';

interface Theme {
  name: string;
  styles: ThemeStyle[];
}

interface ThemeStyle {
  themeVariable: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {

  private themes: Theme[] = [];
  private currentTheme: number = 0;

  constructor(private domCtrl: DomController, @Inject(DOCUMENT) private document) { 

    this.themes = [
      {
        name: 'day',
        styles: [
          { themeVariable: '--ion-color-primary', value: '#3880ff'},
          { themeVariable: '--ion-text-color', value:'#000'},
          { themeVariable: '--ion-text-color-rgb', value: '0,0,0'},
          { themeVariable: '--ion-color-primary-rgb', value: '56, 128, 255'},
          { themeVariable: '--ion-color-primary-contrast', value: '#ffffff'},
          { themeVariable: '--ion-color-primary-contrast-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-primary-shade', value: '#3171e0'},
          { themeVariable: '--ion-color-primary-tint', value: '#4c8dff'},
          { themeVariable: '--ion-item-ios-background-color', value: '#ffffff'},
          { themeVariable: '--ion-item-md-background-color', value: '#ffffff'},
          { themeVariable: '--ion-tabbar-background-color', value: '#fff'},
          { themeVariable: '--ion-tabbar-ios-text-color-active', value: '#000000'},
          { themeVariable: '--ion-tabbar-md-text-color-active', value: '#000000'},
          { themeVariable: '--ion-background-color', value: '#fff'},
          { themeVariable: '--ion-title.title-large', value: '#000'},
          { themeVariable: '--padding-start', value: '0px!important'}
        ]
      },
      {
        name: 'night',
        styles: [
          { themeVariable: '--ion-background-color-rgb', value: '0,0,0'},
          { themeVariable: '--ion-text-color', value: '#ffffff'},
          { themeVariable: '--ion-text-color-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-step-50', value: '#0d0d0d'},
          { themeVariable: '--ion-color-step-100', value: '#1a1a1a'},
          { themeVariable: '--ion-color-step-150', value: '#262626'},
          { themeVariable: '--ion-color-step-200', value: '#333333'},
          { themeVariable: '--ion-color-step-250', value: '#404040'},
          { themeVariable: '--ion-color-step-300', value: '#4d4d4d'},
          { themeVariable: '--ion-color-step-350', value: '#595959'},
          { themeVariable: '--ion-color-step-400', value: '#666666'},
          { themeVariable: '--ion-color-step-450', value: '#737373'},
          { themeVariable: '--ion-color-step-500', value: '#808080'},
          { themeVariable: '--ion-color-step-550', value: '#8c8c8c'},
          { themeVariable: '--ion-color-step-600', value: '#999999'},
          { themeVariable: '--ion-color-step-650', value: '#a6a6a6'},
          { themeVariable: '--ion-color-step-700', value: '#b3b3b3'},
          { themeVariable: '--ion-color-step-750', value: '#bfbfbf'},
          { themeVariable: '--ion-color-step-800', value: '#cccccc'},
          { themeVariable: '--ion-color-step-850', value: '#d9d9d9'},
          { themeVariable: '--ion-color-step-900', value: '#e6e6e6'},
          { themeVariable: '--ion-color-step-950', value: '#f2f2f2'},
          { themeVariable: '--ion-tabbar-ios-text-color-active', value: '#313131'},
          { themeVariable: '--ion-tabbar-md-text-color-active', value: '#313131'},
          { themeVariable: '--ion-item-background-activated', value: '#313131'},
          { themeVariable: '--ion-toolbar-background', value:'#0d0d0d'},
          { themeVariable: '--ion-background-color', value: '#1c1c1c'},
          { themeVariable: '--ion-title.title-large', value: 'white'},
          { themeVariable: '--padding-start', value: '0px!important'}
        ]
      }
    ]

  }

  cycleTheme(): void {
    console.log("entrei no theme switcher...")
    if(this.themes.length > this.currentTheme + 1){
      this.currentTheme++;
    } else {
      this.currentTheme = 0;
    }

    this.setTheme(this.themes[this.currentTheme].name);

  }

  setTheme(name): void {

    let theme = this.themes.find(theme => theme.name === name);

    this.domCtrl.write(() => {

      theme.styles.forEach(style => {
        document.documentElement.style.setProperty(style.themeVariable, style.value);
      });

    });

  }

}