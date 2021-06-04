import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/shared/models/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form:FormGroup;
  submitted:boolean;
  message:string;

  constructor(
    public auth:AuthService,
    private router:Router,
    private route:ActivatedRoute
    ) { }

  ngOnInit():void {

    this.route.queryParams.subscribe((params:Params) => {
        if(params['loginAgain']) {
          this.message = 'Пожалуйста введите данные';
        } else if (params['authFailed']) {
          this.message = 'Сессия истекла, введите данные заново';
        }
    }

    )

    this.form = new FormGroup({
      email: new FormControl(null, [
         Validators.required,
         Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
          Validators.minLength(6),
      ]),
    })
  }

  submit() {
    if (this.form.invalid) return;

    this.submitted = true;

    const user:UserI= {
      ...this.form.value,
      returnSecureToken:  false,
    }

    

    this.auth.login(user).subscribe(
      arg=>{  
        this.form.reset();
        this.router.navigate(['/'])
      },
      ()=>{
        this.submitted = false
      },
      // ()=> this.submitted = false  
      )
      
  }

}
