import { ConnectedProvider } from "@context/ConnectedContext";
import "../styles/globals.scss";
//import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <meta
        name="description"
        content="Une description brève et pertinente du site  Smart garden."
      />
      <title> Smart garden, une application pour arroser mieux</title>

      <ConnectedProvider>
        <body>{children}</body>
      </ConnectedProvider>
    </html>
  );
}
