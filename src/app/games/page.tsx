import styles from "./page.module.scss";
import type { Metadata } from "next";
import Header from "@/ui/Header/header";

export const metadata: Metadata = {
    title: "Games",

    description: "Personal site",
};

export default function Games() {

    return (
        <main className={styles.main}>
            <Header title='Games' />
        </main>
    );
}
