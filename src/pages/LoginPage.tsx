import React, { useState } from "react";
import httpClient from "./Services/httpClient";

const LoginPage: React.FC = () => {
  const [ncontrol, setNcontrol] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const LogInUser = async () => {
    try {
      const resp = await httpClient.post("http://127.0.0.1:5000/login", {
        ncontrol,
        password,
      });
      window.localStorage.setItem("token", resp.data.token);
      window.location.href="/";
    } catch (e: any) {
      if (e.response.status === 401) {
        alert("Datos incorrectos");
      }
    }
  };

  return (
    <>
      <h1>Log into Your Account</h1>
      <form>
        <div>
          <label>ncontrol:</label>
          <input
            type="text"
            value={ncontrol}
            onChange={(e) => setNcontrol(e.target.value)}
            id="ncontrol"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="Password"
          />
        </div>
        <button type="button" onClick={() => LogInUser()}>
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginPage;
