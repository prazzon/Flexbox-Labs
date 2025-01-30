import styles from "./About.module.scss";

function About() {
   return (
      <div className={styles.about}>
         <div className={styles.content}>
            <h1>About Flexbox Labs</h1>
            <p><strong>Flexbox Labs</strong> is a visual tool designed to help you create layouts using CSS Flexbox. With an intuitive interface and real-time previews, it makes experimenting and learning effortless.</p>

            <div>
               <h2>Contribution</h2>
               <p>
                  Flexbox Labs is open source! You can find the project on{" "}
                  <a
                     href="https://github.com/prazzon/flexboxlabs"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     GitHub
                  </a>
                  . If you have feedback, suggestions, or encounter any issues,
                  please open an issue{" "}
                  <a
                     href="https://github.com/prazzon/flexlab/issues"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     here
                  </a>
                  .
               </p>
            </div>

            <div>
               <h2>Support</h2>
               <p>
                  If you find Flexbox Labs helpful, consider supporting its
                  development by{" "}
                  <a
                     href="https://buymeacoffee.com/prazzon"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     buying me a coffee
                  </a>
                  . Your support helps improve and maintain the project.
               </p>
            </div>
         </div>
      </div>
   );
}

export default About;
