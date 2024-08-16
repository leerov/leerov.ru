import styles from "./card.module.scss";
import { Yanone_Kaffeesatz } from "next/font/google";

const yanone_Kaffeesatz = Yanone_Kaffeesatz({ subsets: ["latin"], weight: "400" });

export default function Card({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.card}>
            <div className={styles.content_box}>
                <div className={styles.content}>
                    {children}
                </div>


            </div>

        </div>
    );
}
