import styles from "./MainContent.module.scss";
import Header from "../../Header/Header";

interface Props {
   children: React.ReactNode;
}

export default function MainContent({ children }: Props) {
   return <main className={styles.main_content}>
      <Header />
      {children}</main>;
}
