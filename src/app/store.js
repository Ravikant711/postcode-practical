import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postCodeReducer from './postCodeSlice'
import addressCollectionReducer from './addressCollectionSlice'

const rootReducer = combineReducers({
  postCode: postCodeReducer,
  addressCollection: addressCollectionReducer
})

const store = configureStore({
  reducer: rootReducer,
});

export default store;