import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first} from 'rxjs/operators';

import { trigger, state, style, transition, animate } from '@angular/animations';
import {  ofType } from '@ngrx/effects';

import { select, Store } from '@ngrx/store';

import { PositionStateI } from '../../../reducers/reducer/position.reducer';
import { Subscription, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectPosition } from '../../../reducers/reducer/position.selectors';
import { PosChangeAction, posActionType} from '../../../reducers/reducer/position.actions';


import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/interfaces';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('expandedPanel', [
      state('initial', style({ height: 0 })),
      state('expanded', style({ height: '*' })),
      transition('initial <=> expanded', animate('0.3s')),
    ]),
  ],
})
export class MainLayoutComponent implements OnInit {

  entitySubscribtion:Subscription[] = [];
  public position$:Observable<number> //= this.store$.pipe(select(selectPosition))
  isExpanded: boolean = false
  state: string = 'initial';
  lastRequestFilter:string[] = ['пушкин', 'о женщинах', 'древняя Греция'];
  periods:string[] = ['2 до н.э.', '1 до н.э.', '1 н.э.', '2 н.э.']

  public search:string = '';
  public user:UserI = null;
  
  constructor(
    private router:Router,
    public auth:AuthService,
    private store$:Store<PositionStateI>
    ) {
      this.position$ = this.store$.pipe(select(selectPosition))
     }

  ngOnInit(): void {

    this.getUserInfo();

    this.entitySubscribtion.push(this.auth.user$.subscribe((user=>{
      this.user = user;
    })))

    this.entitySubscribtion.push(this.position$

      .subscribe(
      scrollposition=>{
        const screen = 835;
        const screen6 = screen*2+400;
     
        this.isExpanded = scrollposition>=0;//screen6;
        this.state = this.isExpanded ? 'expanded' : 'initial';
      },
      err=>{console.log('err', err);
      }
      )
    );
  }

  getUserInfo() {
    this.auth.getUserInfoById(null)
    .pipe(first())
    .subscribe(response =>{ 
    },)
  }

  expand() {
    this.isExpanded = !this.isExpanded
    this.state = this.isExpanded ? 'expanded' : 'initial'
  }


  logout(event:MouseEvent) {

    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/', 'login'])
    
  }

  changeQuickFilter(e, value) {
    this.search = value;
    
  }

  filter(e) {
    console.log(this.search)
  }

  add(e) {
    this.router.navigate(['/', 'add-quote'])
    
  }

  removeLastRequest(lastRequest) {
    console.log(lastRequest);
    
  }

  showFooter():boolean {
    if ((this.router.url === '/' || this.router.url.split('?')[0] === '/quotes') && this.auth.isAuthenticated()) {
        return true;
      }
      return false; 
  }

  showAddButton():boolean {
 //if ((this.router.url === '/' || this.router.url.split('?')[0] === '/quotes') && this.auth.isAuthenticated()) {
    if ((this.router.url === '/') && this.auth.isAuthenticated()) {
      return true;
    }
    return false; 
  }

  ngOnDestroy() {  
    this.entitySubscribtion.forEach(sb => sb.unsubscribe());
  }

}
