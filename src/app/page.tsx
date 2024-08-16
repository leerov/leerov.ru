import styles from "./page.module.scss";
import type { Metadata } from "next";
import Header from "@/ui/Header/header";
import Card from "@/ui/Card/card";
import Verticalbar from "@/ui/Verticalbar/verticalbar";
import ContentOnPage from "@/ui/PageContent/ContentOnPage";

export const metadata: Metadata = {
  title: {
    default: "Home - Leerov",
    template: "%s - Leerov"
  },

  description: "Personal site",
};

export default function Home() {

  return (

    <main>
      <Header title='Home' />
      <ContentOnPage>
        <Verticalbar children={undefined}>

        </Verticalbar>
        <Verticalbar>
          <Card>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla consequuntur illum quibusdam quis corporis doloribus sapiente ipsum! Repudiandae praesentium ad quis. Eaque non hic incidunt voluptatum quasi porro minima ipsam.
          </Card>
        </Verticalbar>
        <Verticalbar children={undefined}>

        </Verticalbar>
      </ContentOnPage>

    </main>
  );
}
