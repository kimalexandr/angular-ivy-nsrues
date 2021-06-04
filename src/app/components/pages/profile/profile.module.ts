import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AuthGuard } from '../../../shared/guards/auth.guard';
import {SharedModule} from '../../../shared/shared.module';

import { ProfileLayoutComponent } from '../../layouts/profile-layout/profile-layout.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import  { ProfilePageComponent } from './profile-page/profile-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { AuthorsQuotersPageComponent } from './authors-quoters-page/authors-quoters-page.component';



@NgModule ({
    declarations: [
        ProfileLayoutComponent,
        ProfilePageComponent,
        SettingsPageComponent,
        NotificationsPageComponent,
        AuthorsQuotersPageComponent,
    ],
    imports:[
        CommonModule,
        SharedModule,
        FormsModule,
        MatTabsModule,
        MatListModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        RouterModule.forChild([
            {path:'', component:ProfileLayoutComponent, children:[
                  {path:'', component:ProfilePageComponent, canActivate:[AuthGuard]},
                // {path:'', redirectTo:'/login', pathMatch:'full'},
                // {path:'login', component:LoginPageComponent},
                 {path:'settings', component:SettingsPageComponent, canActivate:[AuthGuard]},
                 {path:'notifications', component:NotificationsPageComponent, canActivate:[AuthGuard]},
                 {path:'authors-quoters', component:AuthorsQuotersPageComponent, canActivate:[AuthGuard]},
                 
                // {path:'create', component:CreatePageComponent, canActivate:[AuthGuard]},
                // {path:'post/:id/edit', component:EditPageComponent, canActivate:[AuthGuard]}      
            ]}
        ]),
    ],
    exports:[
        RouterModule
    ],
    providers:[
         AuthGuard,
        // AlertService,
    ],
    
})

export class ProfileModule {

}