import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse }from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({providedIn:'root'})
export class HashtagsService {

    constructor(private http:HttpClient) {

    }

    getAll():string[] {
        const authors: string[] = [
            'пушкин', 'пушкиннаш', 'золотойвек', 'золотойпоэт', 
            'золотойвекпоэзии', 'поэзия','пушкиннавсегда','суперавтор','мойпушкин',
            'зачемктотоещекогдаестьпушкин'
        ];

          return authors;
    }

}