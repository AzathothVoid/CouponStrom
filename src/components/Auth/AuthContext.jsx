import { createContext, useContext, useEffect, useReducer } from "react";

// Create the initial context state
const initialState = {
  user: null,
  role: null, // Include the user's role
  login: (userData) => {},
  logout: () => {},
};

// Create the AuthContext
const AuthContext = createContext(initialState);

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const savedUserData = sessionStorage.getItem("userData");
    if (savedUserData) {
      const { user, role } = JSON.parse(savedUserData);
      console.log("User: ", user, " Role: ", role);
      dispatch({ type: "LOGIN", payload: { user, role } });
    }
  }, []);

  const login = (userData) => {
    // Your login logic here
    const { token, role, user } = userData;
    sessionStorage.setItem(
      "userData",
      JSON.stringify({ user: token, role, data: user })
    );
    dispatch({ type: "LOGIN", payload: { user: token, role } });
  };

  const logout = () => {
    sessionStorage.removeItem("userData");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, role: state.role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create an authReducer function to handle actions
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        role: action.payload.role, // Set the user's role
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        role: null, // Clear the user's role
      };
    default:
      return state;
  }
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
