import { Injectable } from "@angular/core";
import { Observable, of, throwError, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LayoutService {

    public layoutEvent$:Subject<string> = new Subject<string>();

    constructor() {

    }
}