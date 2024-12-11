import styles from "./page.module.scss";
import type { Metadata } from "next";
import Header from "@/ui/Header/header";

export const metadata: Metadata = {
    title: "Articles",
    description: "Personal site",
};

export default function Articles() {

    return (
        <main className={styles.main}>
            <Header title='Articles' />
        </main>
    );
}
