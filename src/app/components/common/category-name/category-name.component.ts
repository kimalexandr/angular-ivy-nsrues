import { Component, OnInit, Input } from '@angular/core';
import { TitleCategory } from "../../../shared/models/enums"


@Component({
  selector: 'app-category-name',
  templateUrl: './category-name.component.html',
  styleUrls: ['./category-name.component.scss']
})
export class CategoryNameComponent implements OnInit {

  // static Frends:string = "Цитаты о дружбе"; 
  // static Love:string = "Цитаты о любви"; 
  // static Women:string = "Цитаты о женщинах";
  // static Money:string = "Цитаты о деньгах";

  @Input() type:TitleCategory

  constructor() { }

  ngOnInit(): void {
    
    
  }

  public get titleCategory(): typeof TitleCategory {
    return TitleCategory; 
  }

  setClass():string {
    let str:string ="category-name";
    switch(this.type)  {
      case 
      this.titleCategory.Frends,  
      this.titleCategory.Environment:
        str+= ' bg-sky';
        break;
      case 
      this.titleCategory.Love,
      this.titleCategory.SocialInequality:
        str+= ' bg-orange';
         break;
      case 
      this.titleCategory.Money,
      this.titleCategory.VirtualReality:
          str+= ' bg-pink';
        break; 
      case 
      this.titleCategory.Women,
      this.titleCategory.DietBodyFood:
          str+= ' bg-turquoise';
        break;  
    }
    return str;
  }

}
