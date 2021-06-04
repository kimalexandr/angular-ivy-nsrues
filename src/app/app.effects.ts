import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { posActionType, PositionAction } from './reducers/reducer/position.actions';
import {  pipe } from 'rxjs';
import { map } from 'rxjs/operators';


 @Injectable()
export class AppEffects {
    constructor (private actions$:Actions) {

    }

    //@Effect()
    // updatedAt$() {
    //     return this.actions$.pipe(
    //         ofType(countActionType.increase, countActionType.decrease, countActionType.clear),
    //         map(()=>{
    //             return new CountUpdatedAtAction({
    //                 updatedAt:Date.now()
    //             })
    //         })
    //     )
    // }
}

