import { createContext, useEffect, useState } from "react";
export const authContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState({
    testing: "Hello World",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/authTest");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
