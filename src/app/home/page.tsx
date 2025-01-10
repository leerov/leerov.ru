import { Metadata } from "next";
import styles from "./page.module.scss";
import Donut from "@/components/donut";


export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main>
      <Donut 
          centerX={1}
          centerY={1}
          outerRadius={1}
          innerRadius={0.6}
          size={100}
          gradientType="linear"
          gradientColors={['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff']}
      />
    </main>
  );
}
