import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import EditStatus from "./EditStatus";
import { FaCog } from "react-icons/fa";

class Profile extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         userPosts: null,
         loading: true,
         loadingMessage: "Please wait...",
         edit: false,
         postID: null,
      };
      this.returnToProfile = this.returnToProfile.bind(this);
   }

   returnToProfile(event) {
      this.setState({ edit: false, postID: null });
      event.preventDefault();
   }

   componentDidMount() {
      const user = this.props.auth0.user;
      fetch(`http://localhost:3002/${user.nickname}/posts`)
         .then((res) => res.json())
         .then((posts) => this.setState({ userPosts: posts, loading: false }));
   }

   componentDidUpdate(prevState) {
      if (this.state.userPosts !== prevState) {
         const user = this.props.auth0.user;
         fetch(`http://localhost:3002/${user.nickname}/posts`)
            .then((res) => res.json())
            .then((posts) => this.setState({ userPosts: posts, loading: false }));
      }
   }

   render() {
      const user = this.props.auth0.user;

      if (this.state.loading) {
         return <h1>{this.state.loadingMessage}</h1>;
      }
      if (this.state.edit) {
         return <EditStatus post={this.state.postID} profile={this.returnToProfile} />;
      }
      return (
         <>
            <div className="profile">
               <h3>My Profile</h3>
               <img id="prfpic" src={user.picture} alt={user.name} />
               <h4>{user.email === user.name ? "" : user.name}</h4>
               <h4>{user.nickname}</h4>
               <h4>{user.email}</h4>
            </div>
            <div className="userPostContainer">
               {this.state.userPosts.map((post) => {
                  return (
                     <div className="resourceCard" key={post.id} id={post.id}>
                        <div className="cohort">{post.cohort}</div>
                        <h3 className="resourceTitle">{post.title}</h3>
                        <div>{post.created_at.slice(0, 10)}</div>
                        <p>{post.body}</p>
                        <a href={post.link} target="_blank" rel="noreferrer">
                           {post.link}
                        </a>
                        <div>Posted by {post.username}</div>
                        <div>
                           <button
                              id="edtBtn"
                              onClick={() => {
                                 this.setState({ edit: true, postID: post.id });
                              }}
                           >
                              <FaCog />
                           </button>
                        </div>
                     </div>
                  );
               })}
            </div>
         </>
      );
   }
}

export default withAuth0(Profile);
