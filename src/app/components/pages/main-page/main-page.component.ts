import { Component, OnInit, HostListener } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import  {AuthorsService } from '../../../shared/services/authors.service'
import { PositionStateI } from '../../../reducers/reducer/position.reducer';
import { PosChangeAction, } from '../../../reducers/reducer/position.actions';

import { AuthorI, CardI, QuoteI } from "../../../shared/models/interfaces";
import { CardType } from "../../../shared/models/enums";
import { TitleCategory } from "../../../shared/models/enums"

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  //CardType = CardType;
  //titleCategory:TitleCategory;
  public cards:CardI[] = [];
  public quotes:QuoteI[]  = [];
  public author:AuthorI;
  public quote:QuoteI;
  public hashtags:string[]= [];
  public news:number[] = [...Array(10).keys()]; 
  group:any;


  public get titleCategory(): typeof TitleCategory {
    return TitleCategory; 
  }

  constructor(
    private store$:Store<PositionStateI>,
    private route:ActivatedRoute,
    private authorsService:AuthorsService,
    ) { }

  ngOnInit(): void {

    this.createCardsArray();

    this.route.queryParams.subscribe(params=>{

      if (params.author_id) {
        const authors:AuthorI[] =  this.authorsService.getAll();
        this.author = authors.find(item=>(+params.author_id === item.id));
        this.quote = null;
        document.documentElement.scrollTop = 0;
      }

      if (params.quote_id) {
        this.quote = this.quotes.find(item=>+params.quote_id ===(item.id))   
        this.author = null; 
        document.documentElement.scrollTop = 0;    
      }

      if (params.tags) {
        this.hashtags.push(params.tags);
      }
    })
    // this.arr.forEach(item=>{
    //   this.cards.push(<CardI>{key:item, type:this.getRandomValue(0, 1)})
    // })

    
 
  }


  createCardsArray() {

    const authors:AuthorI[] =  this.authorsService.getAll();

    let quote:QuoteI;
    const arr:number[] = [...Array(40).keys()];
    arr.forEach(item=>{
      quote = <QuoteI>{
        id:item, 
        category_id:this.getRandomValue(0, 3), 
        author_id:this.getRandomValue(0,authors.length-1),
      };    
      quote.author_name = authors[quote.author_id].name;

      this.quotes.push(quote)
      this.cards.push(<CardI>{key:quote.id, type:CardType.Quote, quote:quote})
    });

    this.group = this.cards.reduce((r, a) => {
      //console.log("a", a);
      //console.log('r', r);
      //r[a.category_id] = [...r[a.category_id] || [], a];
      r[a.quote.category_id] = [...r[a.quote.category_id] || [], a];
      return r;
     }, {});

     const quoter1:number = Math.floor(this.cards.length/4);
     const quoter2:number = Math.floor(this.cards.length/2); 
     this.group[0] = this.cards.slice(0,quoter1-1);
     this.group[1] = this.cards.slice(quoter1,quoter2-1);
     this.group[2] = this.cards.slice(quoter2,quoter1+quoter2);
     this.group[3] = this.cards.slice(quoter1+quoter2);
    // console.log(this.group[0], this.group[1],  this.group[2],  this.group[3]);
     

     let arrQuotes = this.group[0];
     arrQuotes.splice(0, 0, <CardI>{key:0, type:CardType.News}); 
    arrQuotes = this.group[1];
    arrQuotes.splice(1, 0, <CardI>{key:0, type:CardType.Advertising});

    //  for (let key in this.group) {
    //   let arrQuotes = this.group[key];
    //   arrQuotes.splice(this.getRandomValue(0, arrQuotes.length-1), 0, <CardI>{key:0, type:CardType.News});
    //   arrQuotes.splice(this.getRandomValue(0, arrQuotes.length-1), 0, <CardI>{key:0, type:CardType.News});
    //   arrQuotes.splice(this.getRandomValue(0, arrQuotes.length-1), 0, <CardI>{key:0, type:CardType.News});
    //  }
    // console.log("group", this.group);
  }


  getRandomValue(min:number, max:number):number { 
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  


  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
     // let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
     let pos = document.documentElement.scrollTop; 
      //let max = document.documentElement.scrollHeight;
      // const screen = 835;
      // const screen6 = screen*2-300;
      // if(pos>screen6) {
      //   // всплытие подвала
      //   // console.debug(event, "Scroll Event2");
         this.store$.dispatch(new PosChangeAction(pos));
      // }
        //console.debug(pos, max)
    }

}
