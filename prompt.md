# PROMPT — Développement du frontend React pour l’organisation des examens de l’AAM

## 1. Contexte du projet

Je développe une plateforme web appelée **Académie des Arts Musicaux (AAM)** dans le cadre de mon mémoire de Licence 3.

Le frontend utilise React.js et comporte trois espaces utilisateur :
- `admin` : administration de la plateforme ;
- `professeur` : gestion pédagogique et évaluation des élèves ;
- `eleve` : suivi des formations et consultation des examens.

Le projet possède déjà une structure de pages, des composants réutilisables, un système de navigation, des routes protégées et des interfaces pour les formations, les cours, les paiements, la progression et l’éligibilité aux examens.

Je souhaite maintenant développer les interfaces frontend permettant d’organiser les examens de passage, de préparer les épreuves, d’évaluer les élèves et de consulter les résultats.

### Objectif principal

Créer un ensemble cohérent de pages React permettant à chaque utilisateur d’accomplir les actions correspondant à son rôle.

**Pour cette étape, travailler uniquement sur le frontend.** Ne pas implémenter ni détailler les contrôleurs, les services, les migrations, les routes API ou la liaison avec Laravel. Les données peuvent être simulées temporairement dans le frontend afin de tester les interfaces et les interactions.

## 2. Consignes générales

Avant de commencer :
1. Analyser l’arborescence réelle du frontend.
2. Identifier les pages, composants, layouts, styles, hooks et routes déjà existants.
3. Repérer les fonctionnalités d’éligibilité aux examens déjà intégrées.
4. Déterminer quels fichiers doivent être conservés, adaptés ou créés.
5. Présenter un plan des modifications avant de commencer le développement.

Ne pas recréer les pages d’éligibilité déjà existantes. Les interfaces actuelles doivent être conservées et réutilisées.

Ne pas créer plusieurs composants ayant la même fonction. Privilégier les composants réutilisables et respecter les conventions de nommage du projet.

Les chemins proposés ci-dessous sont indicatifs : les adapter à la structure réellement présente dans le dépôt.

## 3. Interface de l’administrateur

Emplacement cible : `frontend/src/pages/administrateur/`

### A. Page principale — `Examens.jsx`

Créer une interface centralisée de gestion des examens.

Elle doit comprendre :
- un titre et une courte description ;
- des cartes statistiques indiquant le nombre d’examens programmés, terminés, annulés et en attente de résultats ;
- un bouton « Programmer un examen » ;
- un tableau listant les sessions d’examen ;
- des filtres par date, niveau, instrument, professeur, type et statut ;
- une recherche par intitulé ou nom d’élève ;
- des actions pour consulter, modifier ou annuler une session.

Le tableau doit afficher au minimum :
- intitulé de l’examen ;
- type d’examen ;
- niveau ;
- instruments concernés ;
- date et heure ;
- professeur responsable ;
- nombre de participants ;
- statut ;
- actions disponibles.

Prévoir des états visuels distincts pour les sessions programmées, terminées et annulées.

### B. Formulaire de programmation — `ExamenCreate.jsx`

Créer une page ou un formulaire permettant de préparer une nouvelle session.

Organiser les champs en sections claires :

**Informations générales**
- titre de l’examen ;
- type : passage ou repêchage ;
- niveau concerné ;
- instrument(s) concerné(s).

**Planification**
- date ;
- heure ;
- durée ;
- lieu ou mode de passage ;
- consignes générales.

**Organisation**
- professeur responsable ;
- sélection des élèves éligibles ;
- liste récapitulative des participants sélectionnés.

Prévoir une interface de sélection des élèves avec recherche et filtres par niveau et instrument.

Les données d’éligibilité doivent être représentées à partir de données simulées pour cette première étape. Les élèves non éligibles doivent apparaître clairement comme indisponibles à la sélection.

Ajouter :
- des champs obligatoires ;
- des validations frontend ;
- des messages d’erreur explicites ;
- un bouton d’annulation ;
- un bouton d’enregistrement ;
- une confirmation visuelle après un enregistrement simulé.

Ne pas permettre de sélectionner des élèves incompatibles avec le niveau ou les instruments de la session.

### C. Détail d’une session — `ExamenDetail.jsx`

Créer une page de consultation détaillée d’un examen.

Afficher les informations de planification, le professeur responsable, les participants et l’avancement des évaluations.

Organiser la page en sections ou onglets :
- Informations générales ;
- Participants ;
- Épreuves ;
- Évaluations ;
- Résultats.

Les actions affichées doivent dépendre du statut simulé de la session. Par exemple, une session annulée ne doit pas proposer les mêmes actions qu’une session programmée.

Prévoir un accès aux détails de chaque participant et des indicateurs permettant d’identifier les évaluations manquantes.

### D. Validation des résultats — `ResultatsExamens.jsx`

Créer une interface permettant à l’administrateur de consulter les résultats proposés par les professeurs.

Afficher un tableau contenant :
- nom de l’élève ;
- examen ;
- niveau et instrument ;
- note ;
- décision proposée ;
- état de validation ;
- action disponible.

Prévoir des filtres par examen, professeur et statut.

Ajouter des actions permettant de consulter une évaluation, de valider un résultat et de publier les résultats officiels.

Les actions sensibles doivent demander une confirmation avant leur exécution simulée.

Distinguer visuellement :
- résultat en attente ;
- résultat évalué ;
- résultat validé ;
- résultat publié.

## 4. Interface du professeur

Emplacement cible : `frontend/src/pages/professeur/`

### A. Liste des examens — `MesExamens.jsx`

Créer une page présentant les sessions attribuées au professeur.

Afficher :
- les examens à venir ;
- les examens en cours ;
- les examens terminés ;
- les évaluations restant à effectuer.

Chaque examen doit présenter son intitulé, sa date, son niveau, ses instruments, le nombre de participants et son statut.

Ajouter des filtres, une recherche et un accès à la préparation ou à l’évaluation selon la situation.

Le professeur ne doit pas disposer de boutons lui permettant de programmer ou d’annuler les sessions si ces responsabilités sont réservées à l’administrateur.

### B. Préparation des épreuves — `PreparationExamen.jsx`

Créer une interface de préparation pédagogique.

Le professeur doit pouvoir, dans une maquette fonctionnelle :
- ajouter une épreuve ;
- saisir un titre et une description ;
- rédiger les consignes ;
- ajouter des questions ou tâches ;
- définir des critères d’évaluation ;
- définir le barème et la note maximale ;
- réorganiser les épreuves ;
- modifier ou supprimer une épreuve tant que la préparation n’est pas verrouillée ;
- consulter un aperçu de l’épreuve.

Prévoir des champs et des composants adaptés aux différents types d’épreuves musicales : pratique instrumentale, interprétation, technique, théorie musicale ou autre activité pertinente.

Ne pas supposer que toutes les épreuves sont des questionnaires. Certaines peuvent nécessiter une prestation musicale évaluée par le professeur.

Ajouter un indicateur de préparation : brouillon, prêt à être utilisé ou verrouillé.

### C. Évaluation des élèves — `EvaluationExamen.jsx`

Créer une interface d’évaluation claire et adaptée à l’usage pédagogique.

Afficher une liste des participants avec leur statut :
- en attente d’évaluation ;
- évaluation commencée ;
- évaluation terminée.

Lorsqu’un professeur sélectionne un élève, afficher sa fiche d’évaluation avec :
- son identité et les informations utiles ;
- le nom de l’examen ;
- les épreuves prévues ;
- les critères d’évaluation ;
- le barème ;
- les champs de notes ;
- un espace de commentaires pédagogiques ;
- la décision proposée.

Si plusieurs épreuves sont prévues, permettre de saisir une note par épreuve et de présenter un récapitulatif de la note totale.

Prévoir les validations nécessaires pour empêcher les notes négatives ou supérieures au barème.

Ajouter des boutons pour enregistrer le brouillon et terminer l’évaluation. Une confirmation doit apparaître avant la finalisation.

La décision proposée doit suivre une règle clairement affichée. Ne pas inventer de seuil de réussite sans le signaler comme une valeur temporaire à configurer.

## 5. Interface de l’élève

Emplacement cible : `frontend/src/pages/eleve/`

### A. Préparation et convocation — `PreparationExamen.jsx`

Créer une page permettant à l’élève de consulter les informations de son examen.

Afficher :
- l’intitulé et le type d’examen ;
- la date et l’heure ;
- la durée ;
- le lieu ou le mode de passage ;
- le niveau et les instruments ;
- les consignes ;
- les épreuves et ressources de préparation autorisées ;
- le statut de la convocation.

La page doit présenter des états distincts :
- aucun examen programmé ;
- examen programmé ;
- examen prochainement prévu ;
- examen terminé ;
- examen annulé.

Réutiliser les informations d’éligibilité déjà affichées dans le parcours de l’élève. Ne pas recréer la logique ni les composants d’éligibilité.

Si aucun examen n’est attribué à l’élève, afficher un message utile et une action permettant de retourner à sa formation.

### B. Passage de l’examen — `ExamenPassage.jsx`

Créer cette interface uniquement si le projet prévoit des examens en ligne.

Dans une première version frontend, prévoir une maquette avec :
- l’affichage des consignes ;
- les épreuves accessibles ;
- les champs de réponse ou de dépôt de fichier nécessaires ;
- une indication du temps restant si pertinent ;
- un récapitulatif avant soumission ;
- une confirmation avant l’envoi.

Si l’examen est présentiel, privilégier une interface de convocation et d’informations plutôt qu’un moteur d’examen en ligne inutile.

### C. Résultats — `ResultatExamen.jsx`

Créer une page de consultation des résultats.

Afficher :
- l’historique des examens ;
- la date de passage ;
- la note et la note maximale ;
- la décision officielle ;
- les commentaires pédagogiques communicables ;
- la suite du parcours.

Prévoir des états distincts pour les résultats en attente, validés et publiés.

Les notes provisoires ne doivent pas être présentées comme des résultats officiels. Dans la maquette, les résultats restent masqués à l’élève tant que leur statut n’est pas « publié ».

## 6. Intégration dans le parcours existant

Examiner les pages suivantes si elles existent dans le projet :

- `frontend/src/pages/eleve/Formation.jsx`
- `frontend/src/pages/eleve/FormationDetail.jsx`
- `frontend/src/pages/eleve/Progression.jsx`
- `frontend/src/pages/eleve/Paiement.jsx`
- `frontend/src/pages/eleve/CoursDetail.jsx`
- `frontend/src/pages/eleve/LessonPlayer.jsx`
- `frontend/src/utils/parcoursUtils.js`

Le but est de relier visuellement le système d’examen au parcours actuel, sans refaire les fonctionnalités déjà terminées.

Dans les pages de formation, afficher une carte ou une section dédiée à l’examen avec :
- le statut actuel ;
- la prochaine action ;
- la date de convocation lorsqu’elle existe ;
- un lien vers les détails de l’examen ;
- un lien vers les résultats lorsqu’ils sont publiés.

Réutiliser les composants existants pour les informations d’éligibilité et la progression.

## 7. Navigation et routes React

Examiner le routeur actuel et intégrer les nouvelles pages aux espaces correspondant aux rôles.

Prévoir une navigation cohérente :

**Administrateur**
- Examens ;
- Programmer un examen ;
- Détail d’un examen ;
- Résultats à valider.

**Professeur**
- Mes examens ;
- Préparation des épreuves ;
- Évaluation des élèves.

**Élève**
- Mon examen ;
- Préparation et convocation ;
- Mes résultats.

Réutiliser les mécanismes de protection des routes et les layouts existants. Ne pas créer un second système de navigation.

Les routes proposées doivent être adaptées à la convention actuelle du projet. Les liens doivent fonctionner entre les pages et les paramètres nécessaires doivent être transmis correctement.

## 8. Données simulées et interactions frontend

Pour cette étape, utiliser des données simulées dans un fichier ou un module dédié, par exemple :

`frontend/src/data/examensMock.js`

Ces données peuvent représenter :
- des sessions d’examen ;
- des élèves ;
- des professeurs ;
- des niveaux et des instruments ;
- des épreuves ;
- des évaluations ;
- des résultats.

Les données simulées doivent permettre de tester les différents états de l’interface.

Les boutons et formulaires doivent fonctionner localement dans la mesure du possible : filtres, recherche, sélection des élèves, ajout ou modification d’épreuves, saisie des notes, confirmation des actions et changement de statut.

Ne pas se limiter à produire des maquettes statiques.

Isoler les données simulées afin de pouvoir les remplacer ultérieurement par les véritables données du backend sans réécrire toute l’interface.

**Ne pas développer la liaison API Laravel dans cette étape.** Ne pas créer de contrôleurs, services backend, migrations ou endpoints dans le cadre de cette tâche.

## 9. Design et expérience utilisateur

Respecter le design existant de l’AAM.

Conserver :
- les couleurs et le thème actuels ;
- la typographie ;
- les espacements ;
- les boutons ;
- les tableaux ;
- les modales ;
- les composants de navigation ;
- le comportement du thème clair et sombre, s’il est déjà implémenté.

Le résultat doit être moderne, cohérent, lisible et adapté à une plateforme de formation musicale.

Prévoir :
- une interface responsive pour ordinateur, tablette et mobile ;
- des formulaires simples à comprendre ;
- des tableaux lisibles ;
- des badges de statut discrets ;
- des messages de confirmation et d’erreur ;
- des états de chargement et des états vides ;
- une navigation accessible ;
- des confirmations pour les actions importantes.

Ne pas introduire une nouvelle bibliothèque d’interface sans vérifier les dépendances existantes et justifier sa nécessité.

## 10. Composants réutilisables

Lorsque cela est pertinent, créer des composants dédiés, par exemple :
- `ExamenCard.jsx` ;
- `ExamenStatusBadge.jsx` ;
- `ExamenForm.jsx` ;
- `ListeParticipants.jsx` ;
- `EpreuveForm.jsx` ;
- `EvaluationForm.jsx` ;
- `ResultatCard.jsx` ;
- `ConfirmationAction.jsx`.

Emplacement cible : le dossier de composants déjà utilisé dans le projet.

Ces noms sont indicatifs. Réutiliser les composants existants s’ils remplissent déjà la même fonction.

Éviter de copier-coller le même formulaire ou le même affichage dans plusieurs espaces.

## 11. Tests frontend

Vérifier les scénarios suivants à l’aide des données simulées :

1. L’administrateur peut créer et modifier une session.
2. La liste des examens peut être filtrée et recherchée.
3. Les élèves non éligibles ne peuvent pas être sélectionnés dans le formulaire simulé.
4. Le professeur peut préparer plusieurs épreuves.
5. Le professeur peut saisir et modifier une évaluation avant sa finalisation.
6. Les notes dépassant le barème sont refusées.
7. L’élève voit sa convocation lorsqu’une session lui est attribuée.
8. L’élève ne voit pas de résultat officiel avant la publication simulée.
9. Les actions et pages visibles sont adaptées au rôle.
10. La navigation entre les pages fonctionne.
11. Les interfaces restent utilisables sur différentes tailles d’écran.
12. Les fonctionnalités existantes d’éligibilité et de suivi du parcours ne sont pas régressées.

## 12. Méthode de travail et livrables

Procéder progressivement :

1. Analyser le frontend existant.
2. Présenter la liste des fichiers à créer, à modifier et à conserver.
3. Définir la navigation entre les pages de chaque rôle.
4. Développer les composants réutilisables.
5. Développer les pages administrateur.
6. Développer les pages professeur.
7. Développer les pages élève.
8. Intégrer les pages au parcours et au routeur existants.
9. Ajouter les données simulées et les interactions.
10. Vérifier l’affichage responsive et tester les scénarios.

Pour chaque fichier créé ou modifié :
- fournir son chemin exact ;
- expliquer son rôle ;
- fournir le code complet nécessaire ;
- respecter les conventions du projet ;
- préciser les modifications apportées aux routes et aux imports.

Ne pas remplacer entièrement les fichiers existants lorsqu’une modification ciblée suffit.

### Livrables finaux

Fournir :
- le plan des modifications ;
- la liste des fichiers créés et modifiés ;
- le code complet des nouveaux composants et pages ;
- les routes frontend ajoutées ou modifiées ;
- le module de données simulées ;
- les scénarios testés ;
- les fonctionnalités restant à connecter ultérieurement au backend.

**Règle finale :** réaliser uniquement le frontend React du système d’organisation des examens, en réutilisant le travail d’éligibilité déjà effectué. Le résultat doit être navigable, interactif, cohérent avec le design de l’AAM et prêt à être connecté ultérieurement à Laravel.

Commencer par analyser la structure réelle du frontend et présenter le plan des modifications avant de coder.
