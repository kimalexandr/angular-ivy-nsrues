import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse }from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteI } from '../models/interfaces';
import { environment } from 'src/environments/environment';

import { 
    FbCreateResponseI, } from '../models/interfaces';

@Injectable({providedIn:'root'})
export class QuotesService {

    constructor(private http:HttpClient) {

    }

    create(quote:QuoteI):Observable<QuoteI> {
        return this.http.post(`${environment.fbDbUrl}/quotes.json`, quote)
        .pipe(
            map((response:FbCreateResponseI)=> {
                   const newQuote:QuoteI = {
                       ...quote,
                       id: response.name,
                       create_data:new Date(),
                   } 
                   return newQuote;
            })
        )
    }

    getAll():Observable<QuoteI[]> {
        return this.http.get(`${environment.fbDbUrl}/quotes.json`)
        .pipe(
                map((response:{[key:string]:any})=>{
                      
                    return Object
                    .keys(response)
                    .map(key=>({
                        ...response[key],
                        id: key,
                       date:new Date(response[key].date),
                    }))
                })
        )
    }

    getById(id:string):Observable<QuoteI> {
        return this.http.get<QuoteI>(`${environment.fbDbUrl}/quotes${id}.json`)
        .pipe(
            map((quote:QuoteI)=> {
                   const newQuote:QuoteI = {
                       ...quote,
                       id,
                   } 
                   return newQuote;
            })
        )
    }

    update(quote:QuoteI):Observable<QuoteI> {
        return this.http.patch<QuoteI>(`${environment.fbDbUrl}/quotes${quote.id}.json`, {})
    } 
}