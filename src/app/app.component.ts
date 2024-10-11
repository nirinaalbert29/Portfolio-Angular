import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {LanguageService} from "src/app/services/language/language.service"
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'jean-alexis-portfolio';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translateService: TranslateService,
    private location: Location,
    private languageService: LanguageService
    ){
    }
  ngOnInit(): void{

    this.languageService.initLanguage()


    this.titleService.setTitle( "Jean Alexis | Informatic Developer" );

    this.metaService.addTags([
      {name: 'keywords', content: 'Informatic, software, developer'},
      {name: 'description', content: 'With 2 years of experience developing systems, interfaces, and technological solutions to make the web a better place. In my work, I like to lead, propose, and execute ideas, write and refactor clean, reusable, and scalable code.'}
    ]);


    AOS.init();

  }
}
