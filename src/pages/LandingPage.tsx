import React, { useEffect } from "react";
import { useState } from "react";
import { Usuario } from "../models/types";
import httpClient from "./Services/httpClient";

const LandingPage: React.FC = () => {
  const [user, setUser] = useState<Usuario[] | null>();

  const salir = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    (async () => {
      try {
        const loggedUser = window.localStorage.getItem("token");
        const resp = await httpClient.get(
          "https://flaskapi-mu.vercel.app/user",
          {
            headers: {
              Authorization: `Bearer ${loggedUser}`,
            },
          }
        );
        console.log(resp.status);
        console.log(resp.data);
        if (resp.status === 200) {
          setUser(resp.data);
        } else {
          window.location.href = "/login";
          setUser(null);
        }
      } catch (e) {
        console.log("no Audentidado");
      }
    })();
  }, []);
  return (
    <>
      {user != null ? (
        <div>
          <h1>Bienvenido a la Aplication</h1>
          <br />
          <h1>Haz iniciado sesion</h1>
          <h2>Usuario: {user.map((i: Usuario) => i.nombre)}</h2>
          <h2>Estado: {user.map((i: Usuario) => i.estatus)}</h2>
          <button type="button" onClick={salir}>
            Salir
          </button>
        </div>
      ) : (
        <div>
          {/* <a href="/login">
            <button>Login</button>
          </a>
          <a href="/register">
            <button>Register</button>
          </a> */}
          Cargando...
        </div>
      )}
    </>
  );
};

export default LandingPage;
