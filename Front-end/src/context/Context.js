import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  priority: localStorage.getItem("priority") || null,
  token: localStorage.getItem("token") || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  //store user information in local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
	localStorage.setItem("priority", state.priority);
	localStorage.setItem("token", state.token);
  }, [state.user]);

  return (
    <Context.Provider
      value={{		
        user: state.user,
		priority: state.priority,
		token: state.token,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
