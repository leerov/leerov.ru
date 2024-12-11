"use client";
import { useEffect } from "react";
import styles from "@/ui/Sparks/SparklesEffect.module.scss";

const SparklesEffect = () => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            for (let i = 0; i < 5; i++) {
                const sparkle = document.createElement("div");
                sparkle.className = styles.sparkle;

                // Позиция искры
                sparkle.style.left = `${e.pageX}px`;
                sparkle.style.top = `${e.pageY}px`;

                // Вычисление случайного угла и расстояния
                const angle = Math.random() * 2 * Math.PI;
                const distance = 100; // Расстояние в пикселях
                const xOffset = Math.cos(angle) * distance;
                const yOffset = Math.sin(angle) * distance;

                // Установка CSS переменных
                sparkle.style.setProperty('--x', `${xOffset}px`);
                sparkle.style.setProperty('--y', `${yOffset}px`);

                const container = document.getElementById("sparkles-container");
                if (container) {
                    container.appendChild(sparkle);

                    setTimeout(() => {
                        sparkle.remove();
                    }, 1000); // Удаление искры через 1 секунду
                }
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return <div id="sparkles-container"></div>;
};

export default SparklesEffect;
