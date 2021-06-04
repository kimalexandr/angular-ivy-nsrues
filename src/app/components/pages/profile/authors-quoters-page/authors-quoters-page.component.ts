import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authors-quoters-page',
  templateUrl: './authors-quoters-page.component.html',
  styleUrls: ['./authors-quoters-page.component.scss']
})
export class AuthorsQuotersPageComponent implements OnInit {


  public subscribers:any[] = [];

  constructor() { }

  ngOnInit(): void {
    const subscribers:any[] = [...Array(50).keys()];
    this.subscribers = subscribers.map(element=>{
      return  {
        name:`Екатерина Иванова ${element}`,
        age:26,
      }
    })   
  }

  subscribeClick(e, element) {
    e.stopPropagation();
    e.preventDefault();    
  }

}
