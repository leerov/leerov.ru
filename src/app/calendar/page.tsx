import styles from "./page.module.scss";
import type { Metadata } from "next";
import Header from "@/ui/Header/header";

export const metadata: Metadata = {
    title: "Calendar",
    description: "Personal site",
};

export default function Calendar() {

    return (
        <main className={styles.main}>
            <Header title='Calendar' />
        </main>
    );
}
