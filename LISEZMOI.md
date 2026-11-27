# Attrape-rêves

Une appli web installable (PWA) : on raconte son rêve au réveil, l'IA (Gemini) le met en scène en 4 cartes illustrées par une bibliothèque de 100 pictogrammes, et il rejoint la galerie de bulles en petit film. Une deuxième page, l'oracle, interprète les rêves sur un parchemin.

## Ce qu'il y a dans le dossier

| Fichier | À quoi il sert |
|---|---|
| `index.html` | Toute l'appli : l'interface, les styles et le code |
| `manifest.webmanifest` | La « carte d'identité » de l'appli : nom, icône, couleurs, plein écran |
| `sw.js` | Le service worker : il garde l'appli disponible même sans réseau (sauf l'IA) |
| `icone-192.png`, `icone-512.png` | Les icônes de l'écran d'accueil |

## 1. Mettre l'appli en ligne (gratuit, avec GitHub Pages)

À faire de préférence depuis un ordinateur.

1. Crée un compte sur **github.com**.
2. En haut à droite, clique sur **+** puis **New repository**. Nomme-le `attrape-reves`, laisse-le en **Public**, puis clique sur **Create repository**.
3. Sur la page du dépôt, clique sur **uploading an existing file**. Dézippe le dossier, puis glisse les 5 fichiers (pas le dossier lui-même). Clique sur **Commit changes**.
4. Va dans **Settings**, puis **Pages**. Dans « Build and deployment », choisis **Deploy from a branch**, la branche **main** et le dossier **/ (root)**, puis clique sur **Save**.
5. Attends une ou deux minutes. L'adresse de ton appli apparaît en haut de la page **Pages**, du type :
   `https://ton-pseudo.github.io/attrape-reves/`

Le code est public, mais il ne contient ni ta clé ni tes rêves : ils restent uniquement sur ton téléphone.

## 2. L'installer sur ton téléphone

1. Ouvre l'adresse dans **Chrome** sur ton téléphone.
2. Touche le menu **⋮**, puis **Installer l'application** (ou **Ajouter à l'écran d'accueil**).
3. L'icône Attrape-rêves apparaît sur ton écran d'accueil. L'appli s'ouvre en plein écran, comme une vraie appli.

## 3. Brancher l'IA (clé Gemini gratuite)

1. Va sur **aistudio.google.com/apikey** et connecte-toi avec ton compte Google.
2. Clique sur **Create API key** et copie la clé.
3. Dans l'appli, touche la roue ⚙, colle la clé et touche **Tester la clé**.

Bon à savoir :
- Un rêve = 1 requête Gemini, une interprétation de l'oracle = 1 requête. Si le quota gratuit du jour est épuisé, l'appli passe sur le modèle léger (`gemini-3.5-flash-lite`), puis, en dernier recours, fabrique les cartes elle-même à partir des mots du rêve.
- Sur l'offre gratuite, Google peut utiliser les textes envoyés pour améliorer ses produits.
- Ne mets jamais ta clé dans les fichiers du dépôt : elle se colle uniquement dans les réglages de l'appli.
- Si Google renomme ses modèles, change le nom du modèle dans les réglages (par défaut : `gemini-3.8-flash`).

## 4. Tes rêves

- Ils sont enregistrés dans le téléphone, dans la mémoire de l'appli.
- Pense à faire **Réglages → Exporter mes rêves** de temps en temps : si tu désinstalles l'appli ou vides les données de Chrome, ils seraient perdus.
- **Importer** permet de récupérer une sauvegarde, par exemple sur un nouveau téléphone.

## 5. Mettre l'appli à jour

Modifie `index.html` (par exemple avec Claude Code), puis téléverse à nouveau le fichier sur GitHub en passant par **Add file**, puis **Upload files**. La nouvelle version se charge à la prochaine ouverture de l'appli, quand le téléphone a du réseau.
