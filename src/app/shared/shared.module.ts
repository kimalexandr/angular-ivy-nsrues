import { NgModule  } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule,} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';

import { CardComponent } from '../components/common/card/card.component';
import { ClickStopDirective } from './directives/click-stop.directive';
//import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    declarations: [
    CardComponent,
    ClickStopDirective
    ],
    imports: [
        //BrowserModule,
        HttpClientModule,
        MatFormFieldModule,
        MatSelectModule,
         MatInputModule,
         MatIconModule,
         MatButtonModule,
         MatButtonToggleModule,
         MatBottomSheetModule,
         MatCardModule,
         MatTooltipModule, 
         MatRadioModule,    
         NgbModule,
    ],
    exports: [
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatBottomSheetModule,
        MatCardModule,
        MatSelectModule,
        MatTooltipModule,
        MatRadioModule,
        NgbModule,
        CardComponent,
    ]
})

export class SharedModule { }