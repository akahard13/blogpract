import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    //verificamos que el usuario ya existe
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //si el usuario no existe entonces
    //Encripta la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    //realiza la insercion de los datos a la base de datos
    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];
    //devolver respuesta desde el servidor
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};
export const login = (req, res) => {
    //verificamos que el usuario realmente existe
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    //Si existe, validamos la contraseña a ver si coincide
    //con la de ese usuario
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    //si no coincide, le decimos el error contraseña incorrecta
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");
    //si la contraseña coincide, le creamos un token a la sesion 
    //de dicho usuario
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];
    //respondemos desde el servidor con el estado de la peticion
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};
export const logout = (req, res) => {
    //limpiamos los cookies para de este modo cerrar sesion eliminando
    //el token que se le crea a la sesion al hacer Login
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
      }).status(200).json("User has been logged out.")
};
