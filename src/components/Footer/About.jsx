import styles from "./About.module.css";

function About() {
   return (
      <div className={styles.about}>
         <div className={styles.about__content}>
            <h2>About</h2>
            <p>
               FlexLab is an web-based tool specifically designed to assist
               developers, designers, and learners in crafting adaptable and
               responsive layouts through CSS Flexbox. It offers an intuitive
               interface where users can tailor and preview the organization of
               elements within a container. Additionally, users can tweak
               various parameters for each flex item, including order, flex,
               alignment, text properties, font size, and sizing, all within an
               easy-to-use environment.
            </p>
         </div>

         <div className={styles.about__content}>
            <h3>What is Flexbox?</h3>
            <p>
               Flexbox, short for Flexible Box Layout, is a powerful CSS layout
               model that allows you to design complex web layouts with
               simplicity and precision. It&apos;s particularly useful for
               building responsive designs and arranging elements within a
               container, regardless of their size or screen resolution. With
               Flexbox, you have the flexibility to control the alignment,
               order, and sizing of elements with minimal effort.
            </p>
         </div>

         <div className={styles.about__content}>
            <h3>Flexbox Fundamentals: Containers and Items</h3>
            <p>
               Flexbox revolves around two key concepts:{" "}
               <strong>flex containers</strong> and <strong>flex items</strong>.
               <ul>
                  <li>
                     <strong>Flex Container:</strong> This is the parent element
                     that houses the items you want to arrange using Flexbox.
                     You define a container using the display: flex property in
                     your CSS.
                  </li>
                  <li>
                     <strong>Flex Items:</strong> These are the child elements
                     within the flex container. They respond to the properties
                     you set for the container and can be further customized
                     individually.
                  </li>
               </ul>
            </p>
         </div>

         <div className={styles.about__content}>
            <h3>Flex Container Properties:</h3>
            <p>
               These properties define the overall layout behavior of the
               container and how it distributes space among its flex items.
            </p>
            <ol>
               <li>
                  <strong>flex-direction:</strong> Sets the direction of the
                  main axis.
                  <ul>
                     <li>
                        row (default): Items are laid out horizontally from left
                        to right.
                     </li>
                     <li>
                        column: Items are stacked vertically, one on top of
                        another.
                     </li>
                     <li>
                        row-reverse: Items are arranged from right to left.
                     </li>
                     <li>
                        column-reverse: Items are stacked from bottom to top.
                     </li>
                  </ul>
               </li>
               <li>
                  <strong>flex-wrap:</strong> Determines whether flex items are
                  forced onto a single line or can be wrapped onto multiple
                  lines.
                  <ul>
                     <li>
                        nowrap (default): Items do not wrap and overflow if they
                        exceed the container&apos;s width.
                     </li>
                     <li>wrap: Items wrap onto multiple lines as needed.</li>
                     <li>wrap-reverse: Items wrap in reverse order.</li>
                  </ul>
               </li>
               <li>
                  <strong>justify-content:</strong> Aligns flex items along the
                  main axis of the container.
                  <ul>
                     <li>
                        flex-start (default): Items are aligned to the beginning
                        of the container (left for `row`, top for `column`).
                     </li>
                     <li>
                        flex-end: Items are aligned to the end of the container
                        (right for `row`, bottom for `column`).
                     </li>
                     <li>center: Items are centered along the main axis.</li>
                     <li>
                        space-between: Items are evenly distributed with space
                        between them.
                     </li>
                     <li>
                        space-around: Similar to `space-between` but with
                        additional space at the beginning and end of the
                        container.
                     </li>
                  </ul>
               </li>
               <li>
                  <strong>align-items:</strong> Aligns flex items along the
                  cross axis of the container.
                  <ul>
                     <li>
                        flex-start (default): Items are aligned at the top of
                        the container.
                     </li>
                     <li>
                        center: Items are vertically centered within the
                        container.
                     </li>
                     <li>
                        flex-end: Items are aligned at the bottom of the
                        container.
                     </li>
                     <li>
                        stretch (default for single-line layouts): Items stretch
                        to fill the container&apos;s height.
                     </li>
                  </ul>
               </li>
               <li>
                  <strong>align-content:</strong> Controls spacing between
                  multiple lines of flex items.
                  <ul>
                     <li>
                        flex-start (default): Flex lines are aligned at the top
                        of the container.
                     </li>
                     <li>center: Flex lines are centered on the cross-axis.</li>
                     <li>
                        flex-end: Flex lines are aligned at the bottom of the
                        container.
                     </li>
                     <li>
                        space-between: Flex lines are evenly distributed with
                        space between them.
                     </li>
                     <li>
                        space-around: Similar to `space-between` but with
                        additional space at the top and bottom of the container.
                     </li>
                  </ul>
               </li>
            </ol>
         </div>

         <div className={styles.about__content}>
            <h3>Flex Item Properties:</h3>
            <p>
               These properties define the individual behavior of each flex item
               within the container.
            </p>
            <ol>
               <li>
                  <strong>order:</strong> This property allows you to override
                  the default order of the flex items. You can assign an integer
                  value to each item, and they&apos;ll be displayed in ascending
                  order (lower values appear first).
               </li>

               <li>
                  <strong>flex-grow:</strong> This property controls how much a
                  flex item will grow to fill the available space within the
                  container. A value of `0` means the item won&apos;t grow,
                  while a value greater than `0` determines its relative growth
                  compared to other items.
               </li>

               <li>
                  <strong>flex-shrink:</strong> This property controls how much
                  a flex item will shrink if there&apos;s not enough space in
                  the container to accommodate all items at their preferred
                  size. A value of `0` means the item won&apos;t shrink, while a
                  value greater than `0` determines its relative shrink ratio
                  compared to other items.
               </li>

               <li>
                  <strong>flex-basis:</strong> This property sets the default
                  size of a flex item before any growth or shrinkage is applied.
                  It can be specified with various units like pixels (`px`),
                  percentages (`%`), or even `auto` to use the item&apos;s
                  preferred size.
               </li>

               <li>
                  <strong>flex:</strong> This is a shorthand property that
                  combines `flex-grow`, `flex-shrink`, and `flex-basis` into one
                  declaration. It allows you to define all three properties at
                  once.
               </li>

               <li>
                  <strong>align-self:</strong> This property overrides the
                  `align-items` property for a specific flex item. It allows you
                  to define individual vertical alignment for each item within
                  the container. Options are the same as `
                  align-items`(flex-start, center, flex-end, stretch).
               </li>
            </ol>
         </div>
      </div>
   );
}

export default About;
