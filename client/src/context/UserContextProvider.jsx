import React from "react";
import UserContext from "./UserContext.js";

const UserContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    return(
        <UserContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider