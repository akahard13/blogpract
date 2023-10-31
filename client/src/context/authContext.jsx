import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //Inicializamos el estado del usuario a null
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  ); 
  //importamos la url de nuestra api
  const api_url = import.meta.env.VITE_BACKEND_URL;
  //creamos la funcion donde el usuario se loggea e inicializamos
  //el usuario a los valores que trae el user que se loggeó
  const login = async (inputs) => {
    const res = await axios.post(api_url + "auth/login", inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };
  //la funcion logout pues solo consume la api y lo que hace es
  //limpiar el valor del usuario poniendolo a null de nuevo
  const logout = async () => {
    await axios.post(api_url + "auth/logout");
    setCurrentUser(null);
  };
  //el useEffect se encarga de actualizar los cambios en la seccion
  //aplicacion del inspector de chrome
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  //retornamos lo que sea que hayamos seteado anteriormente 
  //para que el usuario al iniciar o cerrar sesion tenga
  //igualmente una vista
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
