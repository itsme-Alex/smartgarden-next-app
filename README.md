This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Configuration HTTPS pour le Développement

Afin de garantir la sécurité des données en transit et d'aligner notre environnement de développement avec nos pratiques de production, nous avons opté pour l'utilisation de HTTPS même en développement local. Voici comment configurer votre environnement pour que cela fonctionne :

### Étape 1 : Récupérer les Certificats

Accédez au Drive où les fichiers ont été partagés (lien reçu par mail le 16/09) et téléchargez le dossier certs.
Placez le dossier certs à l'endroit appropriésur votre ordinateur.
Placez le fichier server.js à la racine du projet.

### Étape 2 : Mise en place du Serveur

Assurez-vous d'avoir le fichier server.js que j'ai partagé via le Drive. Ce fichier configure le serveur pour utiliser le certificat SSL et la clé privée pour HTTPS.
Si nécessaire, adaptez le chemin vers le certificat et la clé privée dans server.js pour correspondre à l'endroit où vous avez placé le dossier certs.

### Étape 3 : Lancer l'Application

Démarrez l'application comme d'habitude. Si tout est correctement configuré, elle devrait maintenant s'exécuter en HTTPS sur l'adresse locale.
Lorsque vous accédez à l'application via un navigateur, il se peut qu'un avertissement s'affiche car nous utilisons un certificat auto-signé. Vous pouvez ignorer cet avertissement en ajoutant une exception pour votre application locale.

### Remarques Importantes

N'utilisez jamais les certificats auto-signés pour la production. Ils sont uniquement destinés à être utilisés dans un environnement de développement.
