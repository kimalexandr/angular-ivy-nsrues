import { Component, OnInit, Input, HostListener, Type } from '@angular/core';
import { Router } from '@angular/router';
import { CardType } from "../../../shared/models/enums"
import { QuoteI } from 'src/app/shared/models/interfaces';

// export type News = 'NEWS';
// export type Quote = 'QUOTE';
// export type CategoryTitle = 'CATEGORY_TITLE';
// export type CategoryTypes = News  | Quote | CategoryTitle;

//	export enum CardType { News, Quote, CategoryTitle };

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  backgroundClass:string = ''; 
  backgroundNews:string = '';
  backgroundAdvertising:string = '';
  windowWidth:number = 0;
  //popAction:string = "popAction";
  CardType = CardType;
  @Input() type:number;
  @Input() quote:QuoteI;
  liked:boolean;

  constructor(
    private router:Router,
  ) {
    this.getScreenSize();
    this.getBgClass();
    this.getBgNewsClass();
    this.getBgAdvertisingClass();
    //console.log(this.type, this.CardType.News);
    
  }

  ngOnInit(): void {

  }

  // public get liked(): boolean {
  //   return false; 
  // }

  showQuoteHandler(e) {
    //console.log(this.quote, 'quote');
   // this.router.navigate(['/show', this.quote.id, 'edit']);
    this.router.navigate(['/quotes'],  { queryParams: { quote_id: this.quote.id } });
  }

  showAuthorHandler(e) {   
    this.router.navigate(['/quotes'],  { queryParams: { author_id: this.quote.author_id } });
    //console.log(this.quote, 'quote');
  }


  actionOnClick( e) {
    console.log('tt', e.x, this.windowWidth); 
 
  } 
  @HostListener('window:resize', ['$event'])
getScreenSize(event?) {
  this.windowWidth = window.innerWidth;

}

  favoriteIconClass():string {
    let str ='cursor-pointer mx-1';
    if (this.liked) str += ' icon-active';
    return str;
  }

  getBgNewsClass()  {
    let value = 'wrapper position-relative';
    value += ` bg_card_news${this.getRandomValue(1, 2)}`; 
    this.backgroundNews = value;
  }

  getBgAdvertisingClass()  {
    let value = 'wrapper position-relative bg_card_advertising';
    this.backgroundAdvertising = value;
  }


  getBgClass() {
    let value = 'wrapper position-relative';
    value += ` app-card-bg${this.getRandomValue(1, 6)}`; 
    this.backgroundClass = value;
  }

  getRandomValue(min:number, max:number):number { 
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

}
