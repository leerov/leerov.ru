import styles from "./page.module.scss";
import type { Metadata } from "next";
import Header from "@/ui/Header/header";

export const metadata: Metadata = {
    title: "Photos",

    description: "Personal site",
};

export default function Photos() {

    return (
        <main className={styles.main}>
            <Header title='Photos' />
        </main>
    );
}
