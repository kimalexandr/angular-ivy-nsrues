import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject} from 'rxjs';
import { take } from 'rxjs/operators';

import { QuotesService } from 'src/app/shared/services/quotes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { 
  QuoteI,
   UserI, 
   CardI 
  } from 'src/app/shared/models/interfaces';
import { CardType } from "../../../../shared/models/enums";


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  //public cards:number[] = [...Array(50).keys()];
  public subscribers:any[] = [];
  public cards:CardI[] = [];
  //public cards$:Subject<CardI[]> = new Subject<CardI[]>();
  public entitySubscribtion:Subscription[] = [];

  public subscribers$:Subject<any[]> = new Subject<any[]>();
  public user:UserI = null;

  public get cardType(): typeof CardType {
    return CardType; 
  }

  constructor(
    private quotesService:QuotesService,
    private auth:AuthService
    ) {
      
     }

  ngOnInit(): void {

    this.createCardsArray();

    this.subscribers$.pipe(take(1)).subscribe(res=>{
      this.subscribers = res;
    })
    this.subscribers$.next([...Array(50).keys()].map((value)=>{
     return `Подписчик ${value}`}));
  

     this.entitySubscribtion.push(this.auth.user$.subscribe((user=>{
       this.user = user;
       //console.log(this.user);
     })))
    // this.entitySubscribtion.push(this.quotesService.getAll().subscribe(response =>{
    //   this.cards = response;
    // }) )

    
  }

  createCardsArray() {

    let quote:QuoteI;
    const arr:number[] = [...Array(40).keys()];
    arr.forEach(item=>{
      quote = <QuoteI>{id:item, category_id:0};
      this.cards.push(<CardI>{key:quote.id, type:this.cardType.Quote, quote:quote})
    });

   // this.cards$.next(this.cards);
   // console.log(this.cards)

  }

  ngOnDestroy() {
    this.entitySubscribtion.forEach(sb => sb.unsubscribe());
  }

}
