import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AuthService } from './shared/services/auth.service';
import { QuotesService } from './shared/services/quotes.service';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FooterComponent } from './components/common/footer/footer.component';
import {reducers, metaReducers } from './reducers';
import { AddQuotePageComponent } from './components/pages/add-quote-page/add-quote-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterseptor } from './shared/interseptors/auth.interceptor';

import { CategoryNameComponent } from './components/common/category-name/category-name.component';
import { ShowQuotePageComponent } from './components/pages/quotes/show-quote-page/show-quote-page.component';
import { QuoteCommentComponent } from './components/pages/quotes/quote-comment/quote-comment.component';
import {AuthorInfoComponent }  from './components/pages/quotes/author-info/author-info.component';
import { ConverterPipe } from './components/pages/quotes/show-quote-page/show-quote-page.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';


//import { CardComponent } from './components/common/card/card.component';

// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatInputModule,} from '@angular/material/input';

const INTERCEPTOR_PROVIDER:Provider = {
  provide: HTTP_INTERCEPTORS,
  multi:true,
  useClass:AuthInterseptor
}

@NgModule({
  declarations: [
    //CardComponent,
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    LoginPageComponent,
    FooterComponent,
    AddQuotePageComponent,
    CategoryNameComponent,
    ShowQuotePageComponent,
    QuoteCommentComponent,
    AuthorInfoComponent,
    ConverterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
     BrowserAnimationsModule,
     MatChipsModule,
     MatMenuModule,
     MatCheckboxModule,
     StoreModule.forRoot(
      reducers, {
        // metaReducers,
        runtimeChecks: {
          strictStateImmutability:true,
          strictActionImmutability:true
        }
       }),
     StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
     EffectsModule.forRoot([]),
     StoreRouterConnectingModule.forRoot(),

    // MatFormFieldModule,
    // MatInputModule,
  ],
  providers: [INTERCEPTOR_PROVIDER, /*QuotesService, */ AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
