import { createContext, useState, type ReactNode } from "react";

type User={
    id:number;
    name:string;
    email:string;
}
type AuthContextType={
    user:User|null;
    login:(user:User)=>void;
    logout:()=>void
}

type AuthProviderProps={
    children:ReactNode
}
export const AuthContext=createContext<AuthContextType|undefined>(undefined);

export function AuthProvider({children}:AuthProviderProps){
    const [user,setUser]=useState<User|null>(null)
    const login=(newUser:User)=>{
        setUser(newUser);
    }
    const logout=()=>{
        setUser(null);
    }

return(
    <AuthContext.Provider value={{user,login,logout}}>
        {children}
    </AuthContext.Provider>
)
}