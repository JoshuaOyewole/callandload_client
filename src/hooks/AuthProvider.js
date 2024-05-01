import {  createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children, isSignedIn }) {
  const [user] = useState(isSignedIn ? { id: 1 } : null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
