import { PositionAction, posActionType } from './position.actions';

export const positionNode = 'position';

export interface PositionStateI {
    position:number;
}


const initialState:PositionStateI = {
    position:0
}

export const positionReducer = (state = initialState, action:PositionAction) => {
   // console.log(action.payload, '<<<');
    switch(action.type) {
        case posActionType.change:
            return {
                ...state,
                position: action.payload
            }

        // case countActionType.decrease:
        // return {
        //     ...state,
        //     count: state.count-1
        // } 

        // case countActionType.clear:
        // return {
        //     ...state,
        //     count: 0
        // } 

        // case countActionType.updatedAt:
        //     return {
        //         ...state,
        //         updatedAt: action.payload.updatedAt
        //     } 

        default:
            return state;
    }
}