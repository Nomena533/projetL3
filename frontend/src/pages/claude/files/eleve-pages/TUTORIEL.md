# Tutoriel — Espace Élève Kalon'ny (v2)

Cette version remplace la navigation par état local par **react-router-dom**,
charge les polices **localement** (aucune requête vers un CDN, fonctionne
hors connexion une fois installé) et utilise **react-icons** au lieu de
lucide-react.

---

## 1. Ce qui a changé par rapport à la version précédente

| | Avant | Maintenant |
| --- | --- | --- |
| Navigation | `useState("dashboard")` + rendu conditionnel | `react-router-dom` : vraies routes, URL synchronisée |
| Icônes | `lucide-react` | `react-icons` (set Feather, `react-icons/fi`) |
| Polices | `@import` Google Fonts (CDN) | `@fontsource/*` — fichiers de police livrés avec le code, aucun réseau requis |

Le rendu visuel est identique : seule la mécanique change.

---

## 2. Structure des fichiers

```
eleve-pages/
├── index.html
├── package.json
├── vite.config.js / tailwind.config.js / postcss.config.js
└── src/
    ├── main.jsx                 # monte <BrowserRouter>, charge les polices locales
    ├── App.jsx                   # déclaration des <Routes>
    ├── styles/index.css
    ├── lib/
    │   ├── icons.js               # point central des icônes (react-icons)
    │   └── mockData.js             # données de démo + config de la navigation
    ├── components/
    │   ├── ValihaStrings.jsx
    │   ├── Field.jsx
    │   ├── StatCard.jsx
    │   └── Shell.jsx                # layout (sidebar + topbar) avec <Outlet />
    └── pages/
        ├── AuthPage.jsx              # /connexion
        ├── Dashboard.jsx              # /
        ├── Catalogue.jsx               # /catalogue
        ├── CourseDetail.jsx             # /cours/:id
        ├── LessonPlayer.jsx              # /lecon
        ├── Progression.jsx                # /progression
        ├── Favoris.jsx                     # /favoris
        ├── Messages.jsx                     # /messages
        └── Profil.jsx                        # /profil
```

---

## 3. Installer et lancer

```bash
cd eleve-pages
npm install
npm run dev
```

Ouvre `http://localhost:5173`. Tu arrives sur `/` (tableau de bord) ; la page
de connexion est sur `/connexion`. Contrairement à la version précédente,
**l'URL change réellement** quand tu navigues, et le bouton retour du
navigateur fonctionne.

> Pourquoi ça marche hors connexion : les polices (`@fontsource/*`) et les
> icônes (`react-icons`) sont des paquets npm classiques, installés dans
> `node_modules` et embarqués par Vite au build — rien n'est chargé depuis
> Google ou un autre serveur au moment de l'exécution.

---

## 4. Comment fonctionnent les routes

`src/App.jsx` déclare l'arborescence :

```jsx
<Route path="/" element={<Shell />}>
  <Route index element={<Dashboard />} />
  <Route path="catalogue" element={<Catalogue />} />
  <Route path="cours/:id" element={<CourseDetail />} />
  {/* ... */}
</Route>
```

`Shell.jsx` est un **layout route** : il affiche la sidebar/topbar et un
`<Outlet />` qui rend la page active. La sidebar utilise `<NavLink>` pour
mettre en surbrillance l'onglet correspondant à l'URL actuelle — plus besoin
de gérer un état `page` à la main.

La page `CourseDetail` lit l'identifiant du cours dans l'URL avec
`useParams()` :

```jsx
const { id } = useParams();
const c = COURSES.find((x) => String(x.id) === id) || COURSES[0];
```

Et les cartes de cours du catalogue pointent vers `/cours/${c.id}` avec
`<Link>`. C'est le seul endroit où l'on exploite un paramètre d'URL ; les
autres pages restent volontairement simples (une seule leçon de
démonstration sur `/lecon`, etc.) — libre à toi d'étendre le même principe
(`/lecon/:id`) quand tu brancheras un vrai backend.

---

## 5. Intégrer dans un projet React existant

### Étape 1 — Copier les fichiers

Copie `src/lib`, `src/components` et `src/pages` dans ton projet.

### Étape 2 — Dépendances

```bash
npm install react-router-dom react-icons @fontsource/fraunces @fontsource/inter @fontsource/ibm-plex-mono
```

Si Tailwind n'est pas encore configuré :

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Et assure-toi que `tailwind.config.js` couvre tes fichiers :

```js
content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
```

### Étape 3 — Polices locales

Dans ton point d'entrée (`main.jsx` ou `index.js`), importe les graisses
utilisées **avant** ton CSS principal :

```js
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
```

Puis dans ton CSS, déclare les classes utilitaires (déjà présentes dans
`src/styles/index.css`) :

```css
.font-display { font-family: "Fraunces", ui-serif, Georgia, serif; }
.font-body { font-family: "Inter", ui-sans-serif, system-ui, sans-serif; }
.font-mono { font-family: "IBM Plex Mono", ui-monospace, monospace; }
```

Si tu as besoin d'autres graisses (ex. Fraunces 900 pour un titre encore
plus marqué), importe simplement le fichier CSS correspondant, ex.
`@fontsource/fraunces/900.css` — la liste complète est visible dans
`node_modules/@fontsource/fraunces/`.

### Étape 4 — Router

Si ton projet n'a pas encore de routeur, enveloppe ton `<App />` avec
`<BrowserRouter>` (voir `main.jsx` fourni). Si tu as déjà react-router-dom
configuré ailleurs dans ton app, il te suffit de fusionner les `<Route>` de
`App.jsx` dans ton arborescence existante — `Shell` peut être monté sous
n'importe quel chemin parent (ex. `/eleve/*`).

### Étape 5 — Icônes

Toutes les icônes passent par `src/lib/icons.js`. Tu n'as rien à changer
dans les pages : si tu veux un jour changer de bibliothèque d'icônes ou
de style, modifie uniquement ce fichier.

---

## 6. Personnaliser les données

`src/lib/mockData.js` centralise les cours, leçons, messages **et** la
configuration de la navigation (`NAV`, avec les chemins de route). Ajoute ou
retire une entrée de `NAV` pour ajouter/retirer un lien dans la sidebar —
n'oublie pas de déclarer la `<Route>` correspondante dans `App.jsx`.

---

## 7. Problèmes fréquents

- **Page blanche après clic sur un lien** → vérifie que le chemin dans
  `<Link to="...">` correspond exactement à une route déclarée dans
  `App.jsx`.
- **Erreur "useNavigate() may be used only in the context of a `<Router>`"**
  → assure-toi que `<BrowserRouter>` entoure bien `<App />` dans `main.jsx`.
- **Les polices ne s'affichent pas** → vérifie que les imports
  `@fontsource/...` sont bien présents dans `main.jsx` (avant `App`), et
  que le paquet est bien dans `package.json` / `node_modules`.
- **Icône manquante / `undefined is not a component`** → l'icône demandée
  n'existe pas sous ce nom dans `react-icons/fi` : vérifie l'orthographe sur
  [react-icons.github.io/react-icons](https://react-icons.github.io/react-icons)
  (accessible uniquement en ligne, à titre de référence — le code lui-même
  ne dépend d'aucun accès réseau une fois les paquets installés).
