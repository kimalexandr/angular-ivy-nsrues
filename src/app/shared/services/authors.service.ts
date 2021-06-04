import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse }from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteI, AuthorI } from '../models/interfaces';
import { environment } from 'src/environments/environment';

import { 
    FbCreateResponseI, } from '../models/interfaces';

@Injectable({providedIn:'root'})
export class AuthorsService {

    constructor(private http:HttpClient) {

    }

    getAll():AuthorI[] {
        const authors: AuthorI[] = [
            {id:0, value: 'a-0', name: 'Boris Akunin'},
            {id:1, value: 'a-1', name: 'Boris Pasternak'},
            {id:2, value: 'a-2', name: 'Aleksander Pushkin'},
            {id:3, value: 'a-3', name: 'Zigmund Freid'}
          ];

          return authors;
    }

    // create(quote:QuoteI):Observable<QuoteI> {
    //     return this.http.post(`${environment.fbDbUrl}/quotes.json`, quote)
    //     .pipe(
    //         map((response:FbCreateResponseI)=> {
    //                const newQuote:QuoteI = {
    //                    ...quote,
    //                    id: response.name,
    //                    create_data:new Date(),
    //                } 
    //                return newQuote;
    //         })
    //     )
    // }

    // getAll():Observable<QuoteI[]> {
    //     return this.http.get(`${environment.fbDbUrl}/quotes.json`)
    //     .pipe(
    //             map((response:{[key:string]:any})=>{
                      
    //                 return Object
    //                 .keys(response)
    //                 .map(key=>({
    //                     ...response[key],
    //                     id: key,
    //                    date:new Date(response[key].date),
    //                 }))
    //             })
    //     )
    // }

    // getById(id:string):Observable<QuoteI> {
    //     return this.http.get<QuoteI>(`${environment.fbDbUrl}/quotes${id}.json`)
    //     .pipe(
    //         map((quote:QuoteI)=> {
    //                const newQuote:QuoteI = {
    //                    ...quote,
    //                    id,
    //                } 
    //                return newQuote;
    //         })
    //     )
    // }

    // update(quote:QuoteI):Observable<QuoteI> {
    //     return this.http.patch<QuoteI>(`${environment.fbDbUrl}/quotes${quote.id}.json`, {})
    // } 
}