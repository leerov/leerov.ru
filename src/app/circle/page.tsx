// Circle.tsx
"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import CircleMenu from "@/ui/CircleMenu/CircleMenu";


const menuItems = [
    { href: "/", label: "Home", icon: "home.svg" },
    { href: "/contacts", label: "Contacts", icon: "contacts.svg" },
    { href: "/resources", label: "Resources", icon: "resources.svg" },
    { href: "/games", label: "Games", icon: "games.svg" },
    { href: "/articles", label: "Articles", icon: "articles.svg" },
    { href: "/photos", label: "Photos", icon: "photos.svg" },
    { href: "/calendar", label: "Calendar", icon: "calendar.svg" },
];

export default function Circle() {
    const router = useRouter();

    return (
        <main className={styles.main}>
            <CircleMenu menuItems={menuItems} /> {/* Передаем данные в CircleMenu */}
            <div className={styles.cancel}>
                <Link href="/" onClick={(e) => {
                    e.preventDefault();
                    router.back();
                    if (!window.history.length) {
                        router.push("/");
                    }
                }}>
                    <Image src="cancel.svg" alt="cancel" width={30} height={30} />
                </Link>
            </div>
        </main>
    );
}
