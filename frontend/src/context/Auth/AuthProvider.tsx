import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };
  return (
    <AuthContext.Provider value={{ username, token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
