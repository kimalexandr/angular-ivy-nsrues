import { 
  Component, 
  OnInit, 
  OnDestroy,
  ChangeDetectionStrategy, 
  ChangeDetectorRef
 } from '@angular/core';
import {  FormGroup, FormControl, Validators, } from '@angular/forms';
import { Subscription} from 'rxjs';
import { UserI, CountryI } from '../../../../shared/models/interfaces';
import { ExternalApiService } from '../../../../shared/services/externalAPI.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { catchError , first} from 'rxjs/operators';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent implements OnInit, OnDestroy {

  entitySubscribtion:Subscription[] = [];
  user:UserI | null; 
  formSet:FormGroup;
  submitted:boolean;
  countryes:CountryI[] = [];
  cityes:any[] = [];

  constructor(
    private externalService:ExternalApiService,
    private auth:AuthService,
    ) { 

    }

     ngOnInit() {

      this.getUserInfo();

      this.formSet = new FormGroup({
        first_name: new FormControl(this.user?this.user.first_name:'', [
           Validators.required,
        ]),
        last_name: new FormControl(this.user?this.user.last_name:null, [
          Validators.required,
        ]),
        nick_name: new FormControl(null, [
  
        ]),
        profile_about: new FormControl(this.user?this.user.profile_about:null, [
  
        ]),
        email: new FormControl(this.user?this.user.email:null, [
          Validators.required,
          Validators.email,
        ]),
        gender: new FormControl(this.user?this.user.gender:null, [
        ]),
        country_id: new FormControl(this.user?this.user.country_id:null, [
        ]),
        city_id: new FormControl(this.user?this.user.city_id:null, [
        ]),
        auth_method: new FormControl(this.user?this.user.auth_method:null, [
        ]),
      })

    this.entitySubscribtion.push(this.auth.user$.subscribe(result =>{
      this.user = result;
      if (this.user && this.user.country_id) this.getCityes(<string>this.user.country_id); 
      if (this.user) this.formSet.patchValue({...this.user})
      
      }
      ,error=>(this.user = null)
      ) 
    )

   
    
    // this.entitySubscribtion.push(this.formSet.valueChanges.subscribe(val => {
    //   //console.log(val, '//', this.form.value);
    // }));

    this.entitySubscribtion.push(this.externalService.getCountryes().subscribe(result=>{
      this.countryes = result;
      //console.log(result);
    }))

    
  }



  getUserInfo() {
    this.auth.getUserInfoById(null)
    .pipe(first())
    .subscribe(response =>{ 
    },)
  }

  submit() {
    if (this.formSet.invalid) return;

     this.submitted = true;

    const user:UserI= {
      ...this.formSet.value,
    }

    this.auth.updateUserFB(user)
    .pipe(first())
    .subscribe(response =>{
     // this.user = response;
      //console.log(response)
      //this.form.reset();
      this.submitted = false;
    },
    err => {
      this.submitted = false;
    }
    )
  
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
      console.log(this.selectedFile.name, fd)

      fd.append('image', this.selectedFile, this.selectedFile.name);

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

  changeCountry(event) {
    this.selectionCountry(event.value);
  }

  getCityes(country_id:string) {

    const selectedCountry:CountryI = this.countryes.find(item=>(item.id ===country_id));
    // console.log(this.countryes, selectedCountry);
    
    if (!selectedCountry) return;

    this.entitySubscribtion.push(this.externalService.getCityes(selectedCountry)
      .subscribe(result=>{
        this.cityes = result;
        console.log(this.cityes)
        if (this.user.city_id) this.formSet.get('city_id').patchValue(this.user.city_id);
      })
      )
  
  }

  selectionCountry(country_id:string) {

    this.getCityes(country_id);   
  }

  ngOnDestroy() {
    this.entitySubscribtion.forEach(sb => sb.unsubscribe());
  }
  

}
