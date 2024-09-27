import styles from "./About.module.scss";

function About() {
   return (
      <div className={styles.about}>
         <div className={styles.content}>
            <h2>About</h2>
            <p>
               <strong>Flexbox Labs</strong> is a visual tool that helps you
               create layouts using CSS Flexbox. It offers an intuitive
               interface that shows changes in real-time, making it easy to
               experiment and learn.
            </p>

            <h3>Feature Overview</h3>
            <p>
               Use the playground toolbar to add, delete, or duplicate flex
               items. You can also undo, redo, or reset changes. For detailed
               adjustments, use the <strong>Edit Tab</strong> to customize the
               flex container and items.
            </p>

            <p>
               The <strong>Save Tab</strong> lets you save your work, load
               previous layouts, or delete edits. This ensures your work is
               always saved, and you can return to it anytime.
            </p>

            <p>
               Flexbox Labs provides pre-built layouts in the{" "}
               <strong>Layout Tab</strong>. Load templates with a click to start
               quickly or get inspired by ready-made designs.
            </p>

            <p>
               Once satisfied with your layout, click the code button on the tab
               to get the generated HTML and CSS code.
            </p>

            <h3>Contribution</h3>

            <p>
               The project is <strong>Open Source</strong> and available on{" "}
               <a href="https://github.com/prazzon/flexlab" target="_blank">GitHub</a>.
            </p>
         </div>
      </div>
   );
}

export default About;
