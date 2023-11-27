import React, {useState, useEffect} from "react";

const AuthContext = React.createContext( {
    isLoggedIn : false,
    onLogout : ( ) => {},
    onLogin: ( email, password, college) => {}
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect( () => {
   
        if(localStorage.getItem("This") === "1"){
          setIsLoggedIn(true);

        }
      }, []);

      const logoutHandler = () => {
        localStorage.removeItem("This");
        setIsLoggedIn(false);
      }

      const loginHandler = ( ) => {
        localStorage.setItem("This", "1");
        setIsLoggedIn(true);
      }


      return <AuthContext.Provider   value={
        {
          isLoggedIn:isLoggedIn,
          onLogout: logoutHandler,
          onLogin : loginHandler
          }
        }>{props.children}</AuthContext.Provider>
}

export default AuthContext;