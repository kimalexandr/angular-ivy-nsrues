// import {NgModule} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatListModule} from '@angular/material/list';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import {MatCheckboxModule} from '@angular/material/checkbox';

// import { AuthGuard } from '../../../shared/guards/auth.guard';
// import {SharedModule} from '../../../shared/shared.module';

// import { ShowQuotePageComponent } from './show-quote-page/show-quote-page.component';




// @NgModule ({
//     declarations: [
//         ShowQuotePageComponent
//     ],
//     imports:[
//         CommonModule,
//         SharedModule,
//         FormsModule,
//         MatTabsModule,
//         MatListModule,
//         ReactiveFormsModule,
//         MatSlideToggleModule,
//         MatCheckboxModule,
//         RouterModule.forChild([
//             {path:'', component:ShowQuotePageComponent, children:[
//                  // {path:'', component:ProfilePageComponent, canActivate:[AuthGuard]},
//                  //{path:'settings', component:SettingsPageComponent, canActivate:[AuthGuard]},
//                  //{path:'notifications', component:NotificationsPageComponent, canActivate:[AuthGuard]},
//                  {path:'quote/:id/show', component:ShowQuotePageComponent, canActivate:[AuthGuard]}
                 
//                 // {path:'create', component:CreatePageComponent, canActivate:[AuthGuard]},
//                 // {path:'post/:id/edit', component:EditPageComponent, canActivate:[AuthGuard]}      
//             ]}
//         ]),
//     ],
//     exports:[
//         RouterModule
//     ],
//     providers:[
//          AuthGuard,
//         // AlertService,
//     ],
    
// })

// export class QuotesModule {

// }