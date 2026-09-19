# Changements — FormationDetail.jsx

## Ce qui a été ajouté

Une nouvelle section **« Progression du niveau »**, dans sa propre carte (`AnimatedSection`), placée entre l'en-tête du niveau et la liste des cours suivis par instrument. Elle est visuellement distincte de la section "Mes cours de [instrument]" qui reste inchangée juste en dessous.

Cette section affiche :
- **Début** et **Fin** de la formation, en haut de la barre (dates formatées en `fr-FR`, ex. `12 janv. 2026`). La date de fin est calculée à partir de `formation.date_debut` + le nombre de mois de `dureeTotale` (elle n'existait pas encore dans les données).
- Une **barre horizontale** avec un point par mois (issu du `dureeTotale` déjà présent dans le code) :
  - mois déjà écoulés → point plein avec un ✓ (`HiOutlineCheckCircle`),
  - mois en cours → point entouré d'un anneau + une flèche `▲` (`HiOutlineChevronUp`) au-dessus, avec le libellé "Actuel" sous le point,
  - mois futurs → point creux.
  - Une ligne de fond (`bg-ivory-dark`) et une ligne de progression (`bg-coral`) qui avance jusqu'au mois actuel.
- Le résumé **Mois écoulés / Mois restants** sous la barre, et le **% terminé** en haut à droite de la carte — toutes ces valeurs viennent de `calculProgression` déjà existant, rien n'a été recalculé côté logique métier.

## Détails techniques

- Import ajouté : `HiOutlineChevronUp` (depuis `react-icons/hi2`, comme les autres icônes du fichier).
- Deux nouvelles constantes calculées après `dureeTotale` : `dateFin` et la fonction `formatDate(date)`.
- Aucune donnée mockée modifiée, aucun appel API ajouté — tout repose sur `formation.date_debut` et `formation.level.duree` déjà consommés par le composant.
- Style Tailwind cohérent avec le reste de la page : tokens `coral` / `ivory` / `ink`, `font-display` / `font-mono`.

## Reste à vérifier

- `formation.date_debut` doit être une date valide venant de l'API (`useUser` / `fetchUserListInscription`) — un format `null`/invalide affichera `—` au lieu de planter.
- Le style de la barre est calibré pour des durées courtes (jusqu'à ~8-10 mois) ; au-delà, les libellés "Mois X" risquent de se chevaucher sur mobile — à tester sur le vrai nombre de mois utilisé par vos niveaux.
