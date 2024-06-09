import { createContext } from "react";

// Context.js
// import React, { createContext, useReducer } from "react";

// const initialState = {
//   avatar: null,
//   username: "",
//   first_name: "",
//   last_name: "",
//   email: "",
//   date_joined: "",
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "updateUser":
//       return { ...state, ...action.payload };
//     case "logout":
//       return initialState;
//     default:
//       return state;
//   }
// }

// const Context = createContext();

// const ContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <Context.Provider value={[state, dispatch]}>
//       {children}
//     </Context.Provider>
//   );
// };

// export { Context, ContextProvider };


export default createContext();