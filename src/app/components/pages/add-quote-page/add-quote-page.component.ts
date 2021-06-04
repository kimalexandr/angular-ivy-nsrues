import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {  FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { QuoteI } from '../../../shared/models/interfaces';
import { QuotesService } from '../../../shared/services/quotes.service';

@Component({
  selector: 'app-add-quote-page',
  templateUrl: './add-quote-page.component.html',
  styleUrls: ['./add-quote-page.component.scss']
})
export class AddQuotePageComponent implements OnInit {

  form:FormGroup;
  submitted:boolean;

  quoteLinksItems:string[] = [null];
  biographyLinksItems:string[] = [null];
  //categoryList: string[] = ['Бизнес', 'Искуство', 'Смысл жизни', 'Женщины', 'Дружба', 'Война'];
  categoryList: {id:number, name:string, checked:boolean}[] = [
    {id:0, name:'Бизнес', checked:false},
    {id:1, name:'Искуство', checked:false},
    {id:2, name:'Смысл жизни', checked:false},
    {id:3, name:'Женщины', checked:false},
    {id:4, name:'Дружба', checked:false},
    {id:5, name:'Война', checked:false},
    {id:6, name:'повседневность', checked:false},
    {id:7, name:'животные', checked:false},
    {id:8, name:'цель', checked:false},
    {id:9, name:'культура', checked:false},
    {id:10, name:'Бизнес2', checked:false},
    {id:11, name:'Искуство2', checked:false},
    {id:12, name:'Смысл жизни2', checked:false},
    {id:13, name:'Женщины2', checked:false},
    {id:14, name:'Дружба2', checked:false},
    {id:15, name:'Война2', checked:false},
    {id:16, name:'повседневность2', checked:false},
    {id:17, name:'животные2', checked:false},
    {id:18, name:'цель2', checked:false},
    {id:19, name:'культура2', checked:false},
];


  constructor(
    public quotesService:QuotesService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {

    this.form = new FormGroup({
      author_name: new FormControl(null, [
         Validators.required,
      ]),
      author_about: new FormControl(null, [
        Validators.required,
      ]),
      quote_text: new FormControl(null, [
        Validators.required,
      ]),
      quote_links:new FormArray([], [Validators.required]),

      categoryes_id: new FormControl(null, [
        Validators.required,
      ]),
      hashtags: new FormControl(null, [
      ]),
      context: new FormControl(null, [
      ]),
      biography_text:new FormControl(null, [
      ]),
      biography: new FormArray([]),

    })

    this.biographyLinksItems.forEach(item => {
      (this.biography as FormArray).push(this.newItem(item));
    }) 

  
    this.quoteLinksItems.forEach(item => {
      (this.quote_links as FormArray).push(this.newItem(item));
    }) 

  }

  getCategoryListArr(i:number):any[] {
    
    let arr:any[] = this.categoryList;
    const q4:number = Math.floor(this.categoryList.length/4);
    const q2:number = Math.floor(this.categoryList.length/2);

    switch (i) {
      case 0:
        arr = this.categoryList.slice(0, q4);
        break;

        case 1:
          arr = this.categoryList.slice(q4, q2);
        break;

        case 2:
          arr = this.categoryList.slice(q2, q2+q4);
        break;

        default:
          arr = this.categoryList.slice(q2+q4);
        break;
        
    }

    return arr;
  }

  newItem(value:string) {
    return new FormControl(value, []);
  }


  get biography() {
    return this.form.get('biography') as FormArray;
  }

  get quote_links() {
    return this.form.get('quote_links') as FormArray;
  }


  get categoryes_id() {
    return this.form.get('categoryes_id') as FormControl;
  }


  addQuoteLinkItem() {
    this.quoteLinksItems.push('')
    this.quote_links.push(this.newItem(''));
  }

  addBiographyLinkItem() {
    this.biographyLinksItems.push('')
    this.biography.push(this.newItem(''));
  }


  removeQuoteLinkItem(index:number, element) {

    let i:number = 0;
    this.quote_links.controls.forEach(item => {
      this.quoteLinksItems[i] = item.value;
      i++;
    })    
    if (this.quoteLinksItems[this.quoteLinksItems.length-1] === "") {
      this.quoteLinksItems[this.quoteLinksItems.length-1]=' ';
      this.quote_links.controls[this.quoteLinksItems.length-1].setValue(' ');     
    }
    this.quoteLinksItems.splice(index, 1);
    this.quote_links.removeAt(index);
  }


  removeBiographyLinkItem(index:number, element) {

    let i:number = 0;
    this.biography.controls.forEach(item => {
      this.biographyLinksItems[i] = item.value;
      i++;
    })    
    if (this.biographyLinksItems[this.biographyLinksItems.length-1] === "") {
      this.biographyLinksItems[this.biographyLinksItems.length-1]=' ';
      this.biography.controls[this.biographyLinksItems.length-1].setValue(' ');     
    }
    this.biographyLinksItems.splice(index, 1);
    this.biography.removeAt(index);
  }

  openCategoryList() {
   
  }
 
  categoryesChange(e, value) {
    //const element=  this.categoryList.find(x => x.id === value.id)
    this.categoryList[value.id].checked = e;
    
    const result = this.categoryList.filter(x => x.checked);
    const names = result.map(item => item.name)
    
 
    const str:string = names.join(', ');
 
   this.categoryes_id.setValue(str);
   // this.categoryes$.next(['Неверный email']);
  }


  submit() {
    if (this.form.invalid) return;

    this.submitted = true;

    const quote:QuoteI= {
      ...this.form.value,
      id:  null,
      author_id: null,
    }

    const categiryesIdChecked = this.categoryList.filter(x => x.checked);
    const categiryesId = categiryesIdChecked.map(item => item.id)
    quote.categoryes_id = categiryesId.join(', ');

    quote.biography = quote.biography.filter(el =>!!el.trim());
    quote.quote_links = quote.quote_links.filter(el =>!!el.trim());
    console.log(quote)

    this.submitted = false;

    // this.quotesService.create(quote)
    // .subscribe(response =>{
    //   this.form.reset();
    //   this.submitted = false;
    // },
    // err => {
    //   this.submitted = false;
    // }
    // )
  
  }


  // =========================== upload file ==========================

  selectedFile: File = null;

onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
    
    
}

onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    // console.log(this.selectedFile.name, fd)

    // fd.append('image', this.selectedFile, this.selectedFile.name);

    // // еще больше:
    // // давайте сконфигурируем объект request, чтобы следить за прогрессом загрузки
    // this.http.post('./api/test-api-for-upload', fd, {
    //     reportProgress: true,
    //     observe: 'events'
    // })
    // .subscribe(event => {
    //     // подключим HttpEventType
    //     // import { HttpClient, HttpEventType } from '@angular/common/http';
    //     // и далее мы можем сделать проверку
    //     if (event.type == HttpEventType.UploadProgress) {
    //         console.log('Upload Progress: ', Math.round(event.loaded / event.total * 100) + '%');
    //     } else (event.type == HttpEventType.Response) {
    //         console.log(event);
    //     }
    // });


    // II
    // если ваш сервер поддерживает прием бинарных файлов, то вы можете отправить файл следующим образом:
    // this.http.post('./api/test-api-for-upload', this.selectedFile)

}

}
