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

## Sécurité : Stockage du JWT dans un cookie

### Mise en place

Nous avons choisi de stocker notre JWT dans un cookie pour profiter d'une sécurité supplémentaire comparée au stockage dans le localStorage ou sessionStorage.

Lors de la mise en place du cookie, nous utilisons le drapeau Secure. Ce drapeau garantit que le cookie n'est envoyé que lors d'une demande effectuée avec une connexion HTTPS, renforçant ainsi la confidentialité des informations du JWT.

Exemple de création d'un cookie sécurisé :

```javascript
res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly; Path=/;`);
```

### Augmenter le niveau de sécurité

Utilisez le drapeau HttpOnly : Cela garantit que le cookie n'est accessible que par le serveur et pas par le JavaScript côté client. C'est crucial pour prévenir les attaques de type cross-scripting (XSS) qui cherchent à voler des cookies.

Utilisez le drapeau SameSite : Ce drapeau peut avoir trois valeurs : Strict, Lax, ou None. Il détermine si les cookies sont envoyés avec les requêtes inter-site. Dans le cas des JWT, SameSite=Strict est généralement recommandé pour assurer que le cookie n'est envoyé que si le site pour lequel il est destiné est le même que celui de la demande initiale.

Définissez une date d'expiration courte : Pour minimiser le risque associé à un éventuel vol du JWT, vous pouvez définir une durée de vie courte pour le token. Si quelqu'un parvenait à voler le token, il n'aurait qu'une fenêtre de temps limitée pour l'utiliser.

Gérez les renouvellements de JWT : Étant donné que votre JWT a une durée de vie courte, vous devrez mettre en place une stratégie pour le renouveler. Une approche courante consiste à utiliser un "refresh token", qui est utilisé pour obtenir un nouveau JWT lorsque l'ancien expire.

Surveillez et gérez les JWT actifs : Si vous avez des raisons de croire qu'un JWT a été compromis, ou si un utilisateur se déconnecte explicitement, prévoyez une méthode pour invalider ou blacklist le JWT.
