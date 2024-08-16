import styles from "./header.module.scss";
import Link from "next/link";
import { Yanone_Kaffeesatz } from "next/font/google";
import KeyBinds from "@/server_stuff/keybinds";

const yanone_Kaffeesatz = Yanone_Kaffeesatz({ subsets: ["latin"], weight: "400" });

export default function Header(props: any) {

    return <>
        <div className={styles.bar}>
            <Link href="circle" className={styles.circle}>
                <div className={styles.circle_border_wrap}>
                    <div className={styles.circle_center}></div>
                </div>
            </Link>

            <div className={styles.title}>
                <div className={yanone_Kaffeesatz.className}>
                    {props.title}
                </div>
            </div>

            <a href="https://t.me/${process.env.leerovrubot}?start=login" className={styles.admin}>
                <div className={styles.admin_border_wrap}>
                    <div className={styles.admin_center}></div>
                </div>
            </a>



            <KeyBinds />
        </div>
    </>
};
