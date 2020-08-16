import { Component } from '@angular/core';
import { ThemeSwitcherService } from '../theme-switcher.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public themeSwitcher: ThemeSwitcherService) {}

  onChange(){
    console.log('mudando tema...')
    this.themeSwitcher.cycleTheme();

  }

}
