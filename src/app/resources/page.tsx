import styles from "./page.module.scss";
import type { Metadata } from "next";
import Header from "@/ui/Header/header";

export const metadata: Metadata = {
    title: "Resources",

    description: "Personal site",
};

export default function Resources() {

    return (
        <main className={styles.main}>
            <Header title='Resources' />
        </main>
    );
}
