import React from "react";

class EditStatus extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: this.props.post,
         title: null,
         message: null,
         link: null,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.returnToProfile = this.returnToProfile.bind(this);
   }

   handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
         [name]: value,
      });
   }

   returnToProfile(event) {
      this.props.profile(event);
      event.preventDefault();
   }

   // DELETES POST
   deletePost = async (id) => {
      await fetch(`http://localhost:3002/delete/${id}`, {
         method: "DELETE",
         headers: { "Content-Type": "application/json" },
      });
      this.returnToProfile();
   };

   // GRABS POST INFO FROM DB TO BE EDITED
   componentDidMount() {
      fetch(`http://localhost:3002/${this.props.post}`)
         .then((res) => res.json())
         .then((post) => {
            console.log(post);
            this.setState({
               title: post.title,
               message: post.body,
               link: post.link,
            });
         });
   }

   // SENDS EDIT TO DB
   editResource = async (id) => {
      const editedPost = {
         title: this.state.title,
         body: this.state.message,
         link: this.state.link,
      };

      await fetch(`http://localhost:3002/edit/${id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(editedPost),
      });
      this.returnToProfile();
   };

   render() {
      return (
         <div className="editModulo">
            <h1>Made mistakes? No worries!</h1>
            <form onSubmit={this.returnToProfile}>
               <label>Title</label>
               <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />

               <label>Message</label>
               <input name="message" type="text" value={this.state.message} onChange={this.handleInputChange} />

               <label>Link</label>
               <input name="link" type="text" value={this.state.link} onChange={this.handleInputChange} />
            </form>
            <div>
               <button
                  id="sbtEdt"
                  onClick={() => {
                     this.editResource(this.state.id);
                  }}
               >
                  Edit
               </button>
               <button
                  id="delPst"
                  onClick={() => {
                     this.deletePost(this.state.id);
                  }}
               >
                  Delete
               </button>
               <button id="cclEdt" onClick={this.returnToProfile}>
                  Cancel
               </button>
            </div>
         </div>
      );
   }
}

export default EditStatus;
