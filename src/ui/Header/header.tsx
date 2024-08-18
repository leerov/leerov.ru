import styles from "./header.module.scss";
import Link from "next/link";
import { Yanone_Kaffeesatz } from "next/font/google";
import KeyBinds from "@/service/keybinds";
import LoginButton from "../LoginButton/LoginButton";

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

            <LoginButton />



            <KeyBinds />
        </div>
    </>
};
