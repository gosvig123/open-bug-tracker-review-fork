import React, { useContext, useEffect } from "react";
import { setToken } from "./api";

export const AuthContext = React.createContext(null)

interface CurrentUser {
  setToken: (token: string) => void
  user: { id: number, name: string } | null
}

export function useUser(): CurrentUser {
  const user = useContext(AuthContext)

  useEffect(() => {
    const mytoken = localStorage.getItem('token');
    if (mytoken) {
      setToken(mytoken);
      console.log('setToken');
    }
  })
  return {
    setToken: (token) => {
      setToken(token);
      localStorage.setItem('token', token);
    },
    user
  }
}