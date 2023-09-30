import { ConnectedProvider } from "@context/ConnectedContext";
import "../styles/globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <ConnectedProvider>
        <body>{children}</body>
      </ConnectedProvider>
    </html>
  );
}
