import React, {useState, createContext, useContext} from 'react'

export const UserContext = createContext();

export default function Global({children}) {
    const [user, setUser] = useState(false);

    function IsCodeSplitting(params){
        setUser(params)
        if(params == true){
            console.log("Code-spltting active");
        }
    }

  return (
    <UserContext.Provider value={{user, IsCodeSplitting}}>
      {children}
    </UserContext.Provider>
  )
}

export function GlobalFunc() {
const {user, setUser} = useContext(UserContext);

  return {user, setUser}
}
