import Welcome from "@/components/showcase/Welcome";
import About from "@/components/showcase/About";
import Navigation from "@/components/Navigation";
import Contact from "@/components/showcase/Contact";
import Portfolio from "@components/showcase/Portfolio"; 
import Footer from "@components/Footer";

import styles from"@styles/showcase/home.module.scss"

export default function Home() {
  return (
      <main className={styles.page}>
          <Navigation/>
         <div id="home">
              <Welcome/>
          </div>
          <div id="portfolio">
              <Portfolio/>
          </div>
          <div id="about">
              <About/>
          </div>
          <div id="contact">
              <Contact/>
          </div>
          <div>
            <Footer/>
          </div>
      </main>
  )
}