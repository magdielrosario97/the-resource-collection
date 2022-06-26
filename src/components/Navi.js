import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";

class Navi extends React.Component {
   render() {
      return (
         <>
            <div className="Head">
               <h1 id="title">The Resource Collection</h1>
               <div id="OLU">Operation Level Up</div>
            </div>
            <div className="nav">
               <Link to="">Home</Link>
               <Link to="about">about</Link>
               <Link to="myprofile">My Profile</Link>
               <LogoutButton />
            </div>
         </>
      );
   }
}

export default Navi;
