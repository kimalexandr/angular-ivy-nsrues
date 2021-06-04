import { createFeatureSelector, createSelector } from "@ngrx/store";
import { positionNode, PositionStateI } from './position.reducer';

const selectPositionFeature = createFeatureSelector<PositionStateI>(positionNode);

export const selectPosition = createSelector(
    selectPositionFeature,
    (state:PositionStateI):number =>state.position
)

// export const selectUpdatedAt = createSelector(
//     selectCountFeature,
//     (state:CountStateI):number =>state.updatedAt
// )