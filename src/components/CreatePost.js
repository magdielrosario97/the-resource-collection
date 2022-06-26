import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

class CreatePost extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         title: "",
         message: "",
         link: "",
         cohort: "",
         username: this.props.auth0.user.nickname,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
         [name]: value,
      });
   }

   handleSubmit(event) {
      this.props.submit(event);
      event.preventDefault();
   }

   submitResource = async () => {
      const newPost = {
         title: this.state.title,
         body: this.state.message,
         link: this.state.link,
         cohort: this.state.cohort,
         username: this.state.username,
      };

      if (this.state.title === "" || this.state.link === "" || this.state.cohort === "") {
      } else {
         await fetch("http://localhost:3002/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
         });
      }
   };

   render() {
      return (
         <div className="createModulo">
            <h1>What is your resource?</h1>
            <div>Posting as {this.state.username}</div>
            <div className="createPostForm">
               <form onSubmit={this.handleSubmit}>
                  <label>Title*</label>
                  <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange} required />

                  <label>Message</label>
                  <input name="message" type="text" value={this.state.message} onChange={this.handleInputChange} />
                  <label>Link*</label>
                  <input name="link" type="text" value={this.state.link} onChange={this.handleInputChange} required />
                  <label>Cohort*</label>
                  <input
                     name="cohort"
                     type="text"
                     placeholder="Please enter MCSP-#, Staff or SEIR"
                     value={this.state.cohort}
                     onChange={this.handleInputChange}
                     required
                  />
                  <div>
                     <input id="crtBtn" type="submit" onClick={this.submitResource} />
                     <button id="cnlBtn" onClick={this.handleSubmit}>
                        Cancel
                     </button>
                  </div>
               </form>
            </div>
            <div>NOTE: Fields with '*' are required</div>
         </div>
      );
   }
}

export default withAuth0(CreatePost);
