// DataContext.js
import React, { createContext, useReducer, useContext, useEffect } from "react";
import { getBlogs } from "../../api/BlogsAPI";
import { getAllCategories } from "../../api/CategoriesAPI";
import { getAllCoupons } from "../../api/CouponsAPI";
import { getAllStores } from "../../api/StoresAPI";
import { getAd } from "../../api/AdsAPI";
import { getCompanyInfo } from "../../api/Company";

const initialState = {
  coupons: [],
  categories: [],
  blogs: [],
  ads: [],
  stores: [],
  company: [],
};

const DataStateContext = createContext(initialState);
const DataDispatchContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_COUPONS":
      return { ...state, coupons: action.payload };
    case "LOAD_CATEGORIES":
      return { ...state, categories: action.payload };
    case "LOAD_BLOGS":
      return { ...state, blogs: action.payload };
    case "LOAD_ADS":
      return { ...state, ads: action.payload };
    case "LOAD_STORES":
      return { ...state, stores: action.payload };
    case "LOAD_COMPANY_INFO":
      return { ...state, company: action.payload };
    default:
      return state;
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Load your data using useEffect or other data-fetching methods here
  // Example: Load coupons and dispatch to update state
  useEffect(() => {
    getAllCategories(dispatch);
    getBlogs(dispatch);
    getAd(dispatch);
    getAllCoupons(dispatch);
    getAllStores(dispatch);
    getCompanyInfo(dispatch);
  }, [window.location]);

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};

const useDataState = () => {
  const context = useContext(DataStateContext);
  if (context === undefined) {
    throw new Error("useDataState must be used within a DataProvider");
  }
  return context;
};

const useDataDispatch = () => {
  const context = useContext(DataDispatchContext);
  if (context === undefined) {
    throw new Error("useDataDispatch must be used within a DataProvider");
  }
  return context;
};

export { DataProvider, useDataState, useDataDispatch };
