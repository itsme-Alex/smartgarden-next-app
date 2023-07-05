import '../styles/globals.scss'
import Footer from "@components/Footer.js"

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
        <body>
          {children}
        </body>
        {/* <footer>
          <Footer />
        </footer> */}
    </html>
  )
}
