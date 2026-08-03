# Tutoriel — Espaces Professeur & Administrateur Kalon'ny (v2)

Même mise à jour que l'espace Élève : **react-router-dom** pour la
navigation, polices **locales** (hors connexion), **react-icons** à la place
de lucide-react.

---

## 1. Ce qui a changé

| | Avant | Maintenant |
| --- | --- | --- |
| Navigation | `useState("dashboard")` + bascule de rôle en mémoire | Deux arbres de routes réels : `/professeur/*` et `/administrateur/*` |
| Icônes | `lucide-react` | `react-icons` (Feather + un complément Heroicons 2) |
| Polices | `@import` Google Fonts (CDN) | `@fontsource/*`, livrées avec le code |

---

## 2. Structure des fichiers

```
pro-admin-pages/
├── index.html
├── package.json
├── vite.config.js / tailwind.config.js / postcss.config.js
└── src/
    ├── main.jsx                     # <BrowserRouter> + polices locales
    ├── App.jsx                       # deux arbres de routes (prof / admin)
    ├── styles/index.css
    ├── lib/
    │   ├── icons.js                    # point central des icônes
    │   └── mockData.js                  # données + config navigation (NAV_PROF, NAV_ADMIN)
    ├── components/
    │   ├── ValihaStrings.jsx
    │   ├── StatCard.jsx
    │   ├── Pill.jsx
    │   ├── Table.jsx
    │   └── Shell.jsx                      # layout, reçoit une prop `role`
    └── pages/
        ├── professeur/
        │   ├── Dashboard.jsx                # /professeur
        │   ├── MesCours.jsx                  # /professeur/mescours
        │   ├── Editeur.jsx                    # /professeur/cours/nouveau et /cours/:id
        │   ├── Corrections.jsx                 # /professeur/corrections
        │   ├── Eleves.jsx                        # /professeur/eleves
        │   └── Messages.jsx                       # /professeur/messages
        └── admin/
            ├── Dashboard.jsx                # /administrateur
            ├── Utilisateurs.jsx               # /administrateur/utilisateurs
            ├── Validation.jsx                  # /administrateur/validation
            ├── Referentiels.jsx                 # /administrateur/referentiels
            ├── Paiements.jsx                      # /administrateur/paiements
            └── Avis.jsx                             # /administrateur/avis
```

---

## 3. Installer et lancer

```bash
cd pro-admin-pages
npm install
npm run dev
```

`http://localhost:5173/` redirige automatiquement vers `/professeur`. Le
sélecteur **Professeur / Admin** en haut de la sidebar est maintenant fait
de vrais liens (`<Link to="/professeur">` / `<Link to="/administrateur">`) —
toujours un raccourci de démo, à remplacer par une vraie logique d'accès en
production (voir section 5).

---

## 4. Comment fonctionnent les routes

`src/App.jsx` déclare deux arbres complètement séparés, chacun avec son
propre `<Shell role="...">` en layout :

```jsx
<Route path="/professeur" element={<Shell role="prof" />}>
  <Route index element={<ProfDashboard />} />
  <Route path="mescours" element={<ProfMesCours />} />
  <Route path="cours/:id" element={<ProfEditeur />} />
  {/* ... */}
</Route>

<Route path="/administrateur" element={<Shell role="admin" />}>
  <Route index element={<AdminDashboard />} />
  {/* ... */}
</Route>
```

`Shell.jsx` reçoit `role` en prop (fixée par la branche de route, plus par un
`useState`), affiche la sidebar correspondante (`NAV_PROF` ou `NAV_ADMIN`
depuis `lib/mockData.js`) et rend la page active via `<Outlet />`.

La page d'édition de cours (`ProfEditeur`) gère à la fois la création
(`/professeur/cours/nouveau`) et la modification (`/professeur/cours/:id`)
grâce à `useParams()` :

```jsx
const { id } = useParams();
const existant = id ? MES_COURS.find((c) => String(c.id) === id) : null;
```

---

## 5. Intégrer dans un projet existant

### Étapes 1 à 3 — identiques à l'espace Élève

Copie `src/lib`, `src/components`, `src/pages`, installe les dépendances et
configure les polices locales : voir `TUTORIEL-eleve-pages.md`, section 5,
étapes 1 à 3 (les commandes sont identiques).

### Étape 4 — Protéger les routes par rôle

Remplace le sélecteur de démonstration dans `Shell.jsx` par une vraie garde
d'accès. Exemple avec un contexte d'authentification :

```jsx
function RequireRole({ role, children }) {
  const { user } = useAuth();
  if (user?.role !== role) return <Navigate to="/connexion" replace />;
  return children;
}

// Dans App.jsx :
<Route
  path="/professeur"
  element={
    <RequireRole role="professeur">
      <Shell role="prof" />
    </RequireRole>
  }
>
  {/* ... */}
</Route>
```

Retire alors les deux liens `Professeur` / `Admin` de `Shell.jsx` — ils
n'ont plus lieu d'être une fois l'accès conditionné par le vrai rôle de
l'utilisateur.

### Étape 5 — Fusionner avec l'espace Élève

Si les trois espaces vivent dans un seul projet, tu peux fusionner les
trois arbres de routes dans un unique `<Routes>` :

```jsx
<Routes>
  <Route path="/connexion" element={<AuthPage />} />
  <Route path="/*" element={<ShellEleve />}>{/* routes élève */}</Route>
  <Route path="/professeur/*" element={<ShellProf />}>{/* routes prof */}</Route>
  <Route path="/administrateur/*" element={<ShellAdmin />}>{/* routes admin */}</Route>
</Routes>
```

Pense aussi à fusionner `lib/mockData.js`, `lib/icons.js`,
`ValihaStrings.jsx` et `StatCard.jsx`, qui sont identiques dans les deux
livraisons.

---

## 6. Personnaliser les données

Tout est dans `src/lib/mockData.js` : cours, soumissions, inscriptions,
utilisateurs, cours à valider, instruments/niveaux, paiements, avis — et la
configuration des menus `NAV_PROF` / `NAV_ADMIN`. Ajoute une entrée dans un
de ces tableaux **et** la `<Route>` correspondante dans `App.jsx` pour
ajouter une page.

---

## 7. Problèmes fréquents

Voir la section 7 de `TUTORIEL-eleve-pages.md` (Tailwind, polices,
dépendances). Spécifique à ce projet :

- **Le sélecteur Professeur/Admin ne change rien** → vérifie que tu es bien
  sur `http://localhost:5173/professeur` ou `/administrateur` dans la barre
  d'adresse ; `Shell` lit son rôle depuis la route, pas depuis un état
  partagé entre les deux arbres.
