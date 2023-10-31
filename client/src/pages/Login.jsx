import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      // La solicitud de inicio de sesión fue exitosa, redirige al usuario.
      navigate("/");
    } catch (err) {
      // Ocurrió un error en la solicitud de inicio de sesión.
      if (err.response) {
        // Si el servidor devuelve una respuesta de error, muestra el mensaje de error.
        setError(err.response.data);
      } else {
        // Si no hay una respuesta del servidor, muestra un mensaje de error genérico.
        setError("Hubo un error en la solicitud de inicio de sesión.");
      }
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleLogin}>Iniciar Sesion</button>
        {err ? <p>{err}</p> : ""}
        <span>
          ¿No tienes una cuenta? <Link to="/register">Registrarse</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
