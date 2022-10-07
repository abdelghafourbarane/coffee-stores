import { createContext, useReducer } from "react";

export const CoffeeStoresContext = createContext();

export const ACTION_TYPE = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const INITIAL_STATE = {
  latLong: "",
  coffeeStores: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_LAT_LONG:
      return { ...state, latLong: action.payload };
    case ACTION_TYPE.SET_COFFEE_STORES:
      return { ...state, coffeeStores: action.payload };
    default:
      throw new Error("undefined action type");
  }
};

const CoffeeStoreProvider=({children})=>{
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    return <CoffeeStoresContext.Provider value={{ state, dispatch }}>
        {children}
    </CoffeeStoresContext.Provider>
}

export default CoffeeStoreProvider