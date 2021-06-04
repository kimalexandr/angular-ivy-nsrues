import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import  {CommentI} from '../../../../shared/models/interfaces';
import { HashtagsService } from '../../../../shared/services/hashtags.service';
import { Router } from '@angular/router';

@Pipe({ name: 'converter' })
export class ConverterPipe implements PipeTransform {
    transform(array: any[], id: string = "id", parentId: string = "parent_id", rootValue: number = 0): any[] {
        return this.filterNodes(array, id, parentId, rootValue);
    }
    filterNodes(array: any[], id: string, parentId: string, parentValue: any): any[] {
        return array.filter((node) => {
            return node[parentId] === parentValue;
        }).map((node) => {
            node["items"] = this.filterNodes(array, id, parentId, node[id]);
            return node;
        });
    }
}


@Component({
  selector: 'show-quote-page',
  templateUrl: './show-quote-page.component.html',
  styleUrls: ['./show-quote-page.component.scss']
})
export class ShowQuotePageComponent implements OnInit {

  backgroundClass:string = '';
  context_text:string; 
  soursesArr:string[] = ['http://freshtunes.com/ru/', 'http://freshtunes1.com/ru/', 'http://freshtunes.com/ru/'];
  hashtagsArr :string[] = []//['пушкин', 'пушкиннаш', 'золотойвек', 'золотойпоэт', 'золотойвекпоэзии'];
  savedUserArr:string[] = ['Василий Еремеев', 'Вася Петров', 'Олег Тинькоф', 'Вася Васильев'];

  comments: CommentI[] = [
    { id:100,text:'Огонь!!', quote_id:99, parent_id:0, author_name:"Lena", create_data: new Date()},
    { id:101,text:'Comment for fire for upper 100', quote_id:99, parent_id:100, author_name:"Savva", create_data: new Date()},
    { id:102,text:'Comment 2222 for upper', quote_id:99, parent_id:100, author_name:"Lena", create_data: new Date()},
    { id:103,text:'Comment 2222 for 101', quote_id:99, parent_id:101, author_name:"Lo rik", create_data: new Date()},
    { id:104,text:'Огонь 2', quote_id:99, parent_id:0, author_name:"P. Sharikov", create_data: new Date()},
    { id:105,text:'Огонь 2', quote_id:99, parent_id:104, author_name:"Alexey", create_data: new Date()},
  ]; 


  constructor(
    private router:Router,
    private hashtagsService:HashtagsService
  ) {
    this.getBgClass();
   }

  ngOnInit(): void {
    this.hashtagsArr = this.hashtagsService.getAll();
    this.context_text = 'Это контекст длинный длинный текст, будем обрезать его после 80 смволов, Это контекст Это контекст Это контекст';
    this.context_text = this.shortenText(this.context_text, 80);
  }

  getBgClass() {
    let value = 'm-4 text-center w-75 d-block position-relative';
    value += ` app-card-bg${this.getRandomValue(1, 6)}`; 
    this.backgroundClass = value;
  }

  shortenText(str, maxLen, separator = ' ') {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen))+'...';
  }

  getRandomValue(min:number, max:number):number { 
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  showHashtag(e, value) {
    e.stopPropagation();
   // console.log(value);
    
    this.router.navigate(['/hashtags'],  { queryParams: { tags: value } });
    
  }

}
