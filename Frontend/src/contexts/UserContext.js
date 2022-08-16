import { createContext, useState } from "react";

const UserContext = createContext();


export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [authorized,setAuthorized] = useState(false)
    const [validUsername, setValidUsername] = useState(true);
    const [changePost, setChangePost] = useState(0);
    const value ={loggedIn, setLoggedIn, user, setUser,
         authorized, setAuthorized ,validUsername,
          setValidUsername, changePost, setChangePost}
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;