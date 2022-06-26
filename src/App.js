import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navi from "./components/Navi";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from "./components/About";
import { withAuth0 } from "@auth0/auth0-react";

class App extends React.Component {
   state = {
      loading: true,
      loadingMessage: "The magic internet people are loading your content!",
      hasError: false,
      errorMessage: "Hmm... Something is broken. Try again soon.",
      resources: null,
      singlePost: null,
   };

   componentDidMount() {
      fetch("http://localhost:3002/")
         .then((res) => res.json())
         .then((posts) => {
            console.log();
            this.setState({ resources: posts, loading: false });
         });
   }

   handleSubmit = (e) => {
      this.setState({ submitted: true });
      e.preventDefault();
   };

   componentDidUpdate(prevState) {
      if (this.state.resources !== prevState) {
         fetch(`http://localhost:3002/`)
            .then((res) => res.json())
            .then((posts) => this.setState({ resources: posts, loading: false }));
      }
   }

   render() {
      if (this.state.loading) {
         return <h1 id="loadingMsg">{this.state.loadingMessage}</h1>;
      }
      if (this.state.hasError) {
         return <h1>{this.state.errorMessage}</h1>;
      }
      if (this.props.auth0.isAuthenticated) {
         return (
            <>
               <Navi />
               <div className="reactive">
                  <Routes>
                     <Route
                        path="/"
                        element={
                           <>
                              <Home posts={this.state.resources} />
                           </>
                        }
                     />
                     <Route path="/myprofile" element={<Profile />} />
                     <Route path="/about" element={<About />} />
                  </Routes>
               </div>
            </>
         );
      } else {
         return <Login />;
      }
   }
}

export default withAuth0(App);
