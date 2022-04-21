import React, { useEffect } from "react";
import { useState } from "react";
import { Usuario } from "../models/types";
import httpClient from "./Services/httpClient";

const LandingPage: React.FC = () => {
  const [user, setUser] = useState<Usuario | null>();

  const salir = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {

    // const loggedUser = window.localStorage.getItem("token");
    // httpClient.get("http://127.0.0.1:5000/user", {
    //   headers: {
    //     Authorization: `Bearer ${loggedUser}`,
    //   },
    // })
    // .then(response => response.data)
    // .then(data=>console.log(data))
    // .catch(err => console.log(err));

    (async () => {
      try {
        const loggedUser = window.localStorage.getItem("token");
        const resp = await httpClient.get("http://127.0.0.1:5000/user", {
          headers: {
            Authorization: `Bearer ${loggedUser}`,
          },
        });
        console.log(resp.status);
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
      {
        user != null
          ? (
            <>
              <h1>Welcome Aplication</h1>
              <br />
              <h1>Haz iniciado sesion</h1>
              <h2>Usuario: {user.nombre}</h2>
              <button type="button" onClick={salir}>
                Salir
              </button>
            </>
          )
          : (
            <div>
              <a href="/login">
                <button>Login</button>
              </a>
              <a href="/register">
                <button>Register</button>
              </a>
            </div>
          )}
    </>
  );
};

export default LandingPage;