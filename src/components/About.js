import React from "react";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { RiMentalHealthLine } from "react-icons/ri";

class About extends React.Component {
   render() {
      return (
         <div className="about">
            <h3>About</h3>
            <br />
            <p>
               Welcome to my PERN stack project built for the students participating in the Operation Level Up immersive
               at Galvanize. This website uses a few different packages found on npm to make it as interactive as
               possible such as React-Router. The idea of this page came about when I was trying to find a couple of
               resources my cohort had sent through Slack and Discord making it a little bit of a hassle to find. So
               with that being said, I am hoping that this app is your solution to finding the resources you need as
               easily as possible. If this page grows in users, I will continue to add features that will make finding
               resources as easy as possible.
            </p>
            <div className="sign">
               <div>Sincerely,</div>
               <div>Magdiel Rosario (MCSP-12)</div>
            </div>
            <div className="socials">
               <a href="https://github.com/magdielrosario97" target="_blank" rel="noreferrer">
                  <FaGithub />
               </a>
               <a href="https://www.linkedin.com/in/msro97" target="_blank" rel="noreferrer">
                  <FaLinkedin />
               </a>
               <a href="https://discordapp.com/users/958929562383818752" target="_blank" rel="noreferrer">
                  <FaDiscord />
               </a>
            </div>

            <br />
            <div className="memory">
               <h3>
                  In Memory Of Hunter Alan Ritter <u>1999-2022</u>
               </h3>
               <br />
               <p>
                  You were a huge part of our cohort family and will be dearly missed by all of us. We may have not
                  known each other in person but you still moved us in the time we knew you.
               </p>
               <br />
               <p>
                  In his memory, I would like to share a link to useful resources to those who may be struggling. Do not
                  be afraid to reach out to those around you.
               </p>
               <p>
                  <a
                     id="resiliency"
                     href="https://www.resilience.af.mil/Prevention-Tools/"
                     target="_blank"
                     rel="noreferrer"
                  >
                     <u id="mhLogo">
                        <RiMentalHealthLine />
                     </u>
                     Resiliency Tools
                  </a>
               </p>
            </div>
         </div>
      );
   }
}

export default About;
