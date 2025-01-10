import { redirect } from "next/navigation";
import styles from "./page.module.scss";

export default function Title() {
  redirect('/home')
}
