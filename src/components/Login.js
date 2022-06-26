import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import galvanize from "./galvanize.jpg";

const Login = () => {
   const { loginWithRedirect } = useAuth0();

   return (
      <div className="loginContainer">
         <h1 id="loginWelc">Welcome to The Resource Collection!</h1>
         <div id="loginMsg">
            A resource pool built by students of <em>Operation Level Up</em>
         </div>
         <button id="loginBtn" onClick={() => loginWithRedirect()}>
            Login/Register
         </button>
         <img id="gLogo" alt="" src={galvanize} />
      </div>
   );
};

export default Login;
