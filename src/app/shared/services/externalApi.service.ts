import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse }from "@angular/common/http";
import { Observable, } from 'rxjs';
import { tap, map } from 'rxjs/internal/operators';
import { CountryI } from '../models/interfaces';



@Injectable({providedIn:'root'})
export class ExternalApiService {

    countryesUrl:string = '/assets/jsons/countryes.json';//'https://htmlweb.ru/geo/api.php?location=&json'; 
    cityUrl:string = '/assets/jsons/locations/';
   //cityesArray:{[string:string]:string}[] = [{'Россия':'RU'}, {'Беларусь':'BY'}]

    constructor(private http:HttpClient) {

    }

    getCountryes():Observable<any> {
        return this.http.get(`${this.countryesUrl}`)
        .pipe(
             map((response:{[key:string]:CountryI})=>{
                      
                    return Object
                    .keys(response)
                    .map(key=>({
                        //...response[key],
                        //id: key,
                        id:response[key].id,
                       name:response[key].name,
                       iso:response[key].iso
                    }))
                }),
            //  map((response:any)=>{
            //     return Object
            //     .keys(response)
            //     .map(key=>{
            //         return response[key]
            //         //id: key,
            //        //date:new Date(response[key].date),
            //     })

            //  })
        )
    }


    getCityes(country:CountryI):Observable<any> {
        return this.http.get(`${this.cityUrl+country.id}.json`)
        .pipe(
            map((response:any)=>{
                return response.items
            }),
             map((response:{[key:string]:any})=>{
                      
                    return Object
                    .keys(response)
                    .map(key=>({
                        id:response[key].id,
                       name:response[key].name
                    }))
                })

        )
    }
}


