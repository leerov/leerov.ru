import styles from "./page.module.scss";
import type { Metadata } from "next";
import Header from "@/ui/Header/header";

export const metadata: Metadata = {
    title: "Contacts",

    description: "Personal site",
};

export default function Contacts() {

    return (
        <main className={styles.main}>
            <Header title='Contacts' />
        </main>
    );
}
