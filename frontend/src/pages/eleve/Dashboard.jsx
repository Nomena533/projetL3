import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineArrowRight,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineHeart,
  HiOutlineLockClosed,
  HiOutlineMusicalNote,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import StatCard from "../../components/StatCard";
import { COURSES, CERTIFICATS, TONE_BG } from "../../lib/mockStudentData";
import { capitalize } from "../../lib/formatFunction";
import { useAuth } from "../../app/hooks/useAuth";
import { useUser } from "../../app/hooks/useUser";
import { useLevel } from "../../app/hooks/useLevel";
import { useMessage } from "../../app/hooks/useMessage";
import usePaiement from "../../app/hooks/usePaiement";
import { useLang } from "../../app/hooks/useLang";
import { ActionFeedback, DataGate } from "../../components/AsyncState";
import useAsyncAction from "../../app/hooks/useAsyncAction";
import { dateLocale, getRuntimeLang, tr } from "../../lib/i18nRuntime";

/* ------------------------------------------------------------------ */
/* Helpers (affichage uniquement — aucune écriture vers l'API)         */
/* ------------------------------------------------------------------ */

const JOUR_MS = 1000 * 60 * 60 * 24;

// "6 mois" -> 6 (même lecture que Formation.jsx / FormationDetail.jsx)
function dureeEnMois(level) {
  const n = parseInt(level?.duree?.split(" ")[0], 10);
  return Number.isNaN(n) ? 0 : n;
}

const pluriel = (n, mot) =>
  getRuntimeLang() === "mg" ? `${n} ${tr(mot)}` : `${n} ${mot}${n > 1 ? "s" : ""}`;

// Même calcul que FormationDetail.jsx : mois écoulés depuis date_debut.
function calculProgression(dateDebut, dureeTotale) {
  if (!dateDebut || !dureeTotale) {
    return { moisEcoules: 0, moisActuel: 0, moisRestants: dureeTotale || 0, progression: 0 };
  }
  const debut = new Date(dateDebut);
  const now = new Date();
  let moisEcoules = (now.getFullYear() - debut.getFullYear()) * 12 + (now.getMonth() - debut.getMonth());
  if (now.getDate() < debut.getDate()) moisEcoules--;
  moisEcoules = Math.max(0, moisEcoules);
  const moisActuel = Math.min(moisEcoules + 1, dureeTotale);
  return {
    moisEcoules,
    moisActuel,
    moisRestants: Math.max(dureeTotale - moisActuel, 0),
    progression: Math.min((moisActuel / dureeTotale) * 100, 100),
  };
}

function dateFinNiveau(dateDebut, dureeTotale) {
  if (!dateDebut) return null;
  const fin = new Date(dateDebut);
  fin.setMonth(fin.getMonth() + Number(dureeTotale));
  return fin;
}

function formatDate(date) {
  if (!date) return "—";
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(dateLocale(), { day: "2-digit", month: "short", year: "numeric" });
}

// Même libellés que FormationDetail.jsx pour l'examen de passage.
function infoExamen(dateExamen) {
  if (!dateExamen) return null;
  const d = new Date(dateExamen);
  if (Number.isNaN(d.getTime())) return null;
  const jours = Math.ceil((d - new Date()) / JOUR_MS);
  if (jours < 0) return { label: tr("Passé"), urgent: false };
  if (jours === 0) return { label: tr("Aujourd'hui"), urgent: true };
  return { label: tr("Dans {{n}}", { n: pluriel(jours, "jour") }), urgent: jours <= 14 };
}

const STATUT_NIVEAU = {
  termine: { label: "Terminé", badge: "bg-coral/15 text-coral-dark" },
  en_cours: { label: "En cours", badge: "bg-coral text-ivory" },
  en_attente: { label: "En attente", badge: "bg-amber/20 text-ink" },
  non_inscrit: { label: "Non commencé", badge: "bg-ivory-dark text-ink-soft" },
};

const EN_COURS = COURSES.filter((c) => c.progression > 0);

const QUICK_LINKS = [
  { to: "/eleve/catalogue", label: "Catalogue", icon: HiOutlineAcademicCap },
  { to: "/eleve/favoris", label: "Favoris", icon: HiOutlineHeart },
  { to: "/eleve/messages", label: "Messages", icon: HiOutlineChatBubbleLeftRight },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function DashboardContent() {
  const { t } = useLang();
  const { user } = useAuth();
  const { userListInscription, fetchUserListInscription, userList } = useUser();
  const { paiementList } = usePaiement();
  const { levels } = useLevel();
  const { conversations } = useMessage();

  // Chargement des inscriptions de l'élève (plein écran + erreur « Réessayer »)
  const load = useAsyncAction({ initialPending: !!user?.id, initialLabel: "Chargement de votre tableau de bord" });

  const charger = () => {
    if (!user?.id) return;
    return load.run("Chargement de votre tableau de bord", () => fetchUserListInscription(user.id));
  };

  useEffect(() => {
    charger();
  }, [user]);

  // ---------- Parcours : un objet par niveau (même logique que Formation.jsx) ----------
  const parcours = useMemo(() => {
    return (levels || []).map((niveau) => {
      const inscription = (userListInscription || []).find((i) => i.niveau_id === niveau.id);
      if (!inscription) return { niveau, inscription: null, statut: "non_inscrit" };

      const duree = dureeEnMois(inscription.level || niveau);
      const moisPayes = (paiementList || [])
        .filter((p) => p.inscription_id === inscription.id)
        .reduce((somme, p) => somme + (parseInt(p.nombre_mois, 10) || 0), 0);
      const moisAPayer = Math.max(duree - moisPayes, 0);
      const base = { niveau, inscription, duree, moisPayes, moisAPayer };

      if (!inscription.date_debut) return { ...base, statut: "en_attente" };

      const prog = calculProgression(inscription.date_debut, duree);
      const fini = duree > 0 && prog.moisEcoules >= duree;
      return { ...base, ...prog, statut: fini ? "termine" : "en_cours" };
    });
  }, [levels, userListInscription, paiementList]);

  const niveauEnCours = parcours.find((p) => p.statut === "en_cours");
  const niveauEnAttente = parcours.find((p) => p.statut === "en_attente");
  const niveauxTermines = parcours.filter((p) => p.statut === "termine").length;

  // ---------- Messages ----------
  const messagesNonLus = (conversations || []).reduce((s, c) => s + (c.unreadCount || 0), 0);
  const conversationsRecentes = [...(conversations || [])]
    .filter((c) => c.messages?.length)
    .sort((a, b) => (b.unreadCount || 0) - (a.unreadCount || 0))
    .slice(0, 3);

  // ---------- À faire ----------
  const examen = niveauEnCours ? infoExamen(niveauEnCours.inscription.date_examen) : null;
  const aFaire = [];
  if (niveauEnCours?.moisAPayer > 0) {
    aFaire.push({
      id: "paiement",
      icon: HiOutlineBanknotes,
      titre: t("{{v0}} à régler", { v0: pluriel(niveauEnCours.moisAPayer, "mois") }),
      detail: t("Niveau {{v0}}", { v0: capitalize(niveauEnCours.niveau.name) }),
      to: "/eleve/formation",
      cta: t("Payer"),
      urgent: true,
    });
  }
  if (examen) {
    aFaire.push({
      id: "examen",
      icon: HiOutlineCalendarDays,
      titre: t("Examen de passage : {{v0}}", { v0: examen.label.toLowerCase() }),
      detail: formatDate(niveauEnCours.inscription.date_examen),
      to: `/eleve/formation/${niveauEnCours.niveau.name}`,
      cta: t("Voir le niveau"),
      urgent: examen.urgent,
    });
  }
  if (niveauEnAttente) {
    aFaire.push({
      id: "attente",
      icon: HiOutlineLockClosed,
      titre: "Inscription en attente de validation",
      detail: t("Niveau {{v0}}", { v0: capitalize(niveauEnAttente.niveau.name) }),
      to: "/eleve/formation",
      cta: t("Voir mon parcours"),
      urgent: false,
    });
  }
  if (messagesNonLus > 0) {
    aFaire.push({
      id: "messages",
      icon: HiOutlineChatBubbleLeftRight,
      titre: t(messagesNonLus > 1 ? "{{v0}} non lus" : "{{v0}} non lu", { v0: pluriel(messagesNonLus, "message") }),
      detail: "De tes professeurs",
      to: "/eleve/messages",
      cta: t("Lire"),
      urgent: false,
    });
  }

  const fonction = (min, max) => {
    const aleatoire = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomSimple = Math.random() * (max - min + 1) + min;
    const maximum = Math.max(min,max);
    const minimum = Math.min(min,max);
    return {
      aleatoire : aleatoire,
      randomSimple : randomSimple,
      maximum : maximum,
      minimum : minimum
    }
  }

  console.log("fonction(5,15) : ", fonction(5,15));

  // ---------- Hero ----------
  const prenom = (user?.firstname || user?.name || "").trim();
  let heroTitre;
  let heroCta;
  if (niveauEnCours) {
    const { moisActuel, duree, moisRestants, niveau } = niveauEnCours;
    heroTitre = t("Mois {{moisActuel}} sur {{duree}} du niveau {{niveauNom}}. {{suite}}", {
      moisActuel,
      duree,
      niveauNom: capitalize(niveau.name),
      suite: moisRestants > 0 ? t("Encore {{v0}} pour le terminer.", { v0: pluriel(moisRestants, "mois") }) : t("C'est le dernier mois, tiens bon."),
    });
    heroCta = { to: `/eleve/formation/${niveau.name}`, label: t("Reprendre ma formation") };
  } else if (niveauEnAttente) {
    heroTitre = t("Ton inscription au niveau {{v0}} est en attente de validation. Tu pourras commencer dès qu'elle sera validée.", { v0: capitalize(niveauEnAttente.niveau.name) });
    heroCta = { to: "/eleve/formation", label: t("Voir mon parcours") };
  } else {
    heroTitre = t("Choisis ton niveau et commence à tresser tes progrès.");
    heroCta = { to: "/eleve/formation", label: t("Voir les niveaux") };
  }

  const moisPayesTotal = niveauEnCours ? `${niveauEnCours.moisPayes} / ${niveauEnCours.duree}` : "—";

  if (load.pending || load.error) {
    return <ActionFeedback action={load} variant="fetch" />;
  }

  return (
    <div className="space-y-10">
      {/* ---------- HERO ---------- */}
      <AnimatedSection className="relative overflow-hidden rounded-4xl bg-linear-to-br from-brick via-coral to-amber p-1 shadow-2xl shadow-brick/20">
        <div className="relative overflow-hidden rounded-[1.85rem] bg-ink/90 p-8 sm:p-10">
          <div className="relative z-10 max-w-lg">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-light">{t("Bonjour")}{prenom ? ` ${prenom}` : ""}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ivory sm:text-3xl">{heroTitre}</h2>
            <Link
              to={heroCta.to}
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 font-body text-sm font-semibold text-brick shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {t(heroCta.label)}
              <HiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ValihaMotif count={22} tone="amber" className="pointer-events-none absolute -right-4 top-0 h-full w-40 opacity-50" />
        </div>
      </AnimatedSection>

      {/* ---------- STATS ---------- */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={HiOutlineMusicalNote}
          label={t("Niveaux terminés")}
          value={`${niveauxTermines} / ${(levels || []).length}`}
        />
        <StatCard icon={HiOutlineBanknotes} label={t("Mois payés (niveau en cours)")} value={moisPayesTotal} delay={80} />
        <StatCard icon={HiOutlineChatBubbleLeftRight} label={t("Messages non lus")} value={messagesNonLus} delay={160} />
        <StatCard icon={HiOutlineAcademicCap} label={t("Certificats obtenus")} value={CERTIFICATS.length} delay={240} />
      </section>

      {/* ---------- CORPS : 2 colonnes ---------- */}
      <div className="grid gap-10 lg:grid-cols-3">
        {/* ===== Colonne principale ===== */}
        <div className="space-y-10 lg:col-span-2">
          {/* --- Niveau en cours --- */}
          <section>
            <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-display text-xl font-semibold text-ink">{t("Mon niveau en cours")}</h3>
              <Link
                to="/eleve/formation"
                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors hover:text-brick"
              >{t("Mon parcours")}{" "}<HiOutlineArrowRight size={15} />
              </Link>
            </AnimatedSection>

            {niveauEnCours ? (
              <AnimatedSection className="mt-6 rounded-2xl border border-ivory-dark bg-white/60 p-6 dark:bg-white/10">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="font-display text-lg font-semibold text-ink">{capitalize(niveauEnCours.niveau.name)}</h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {(niveauEnCours.inscription.instruments || []).map((instrument) => (
                        <span
                          key={instrument.id}
                          className="inline-flex items-center gap-1 rounded-full bg-ivory px-2.5 py-0.5 font-body text-xs text-ink-soft"
                        >
                          <HiOutlineMusicalNote size={12} /> {instrument.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="rounded-full bg-coral/15 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-coral-dark">{t("Mois {{moisActuel}} / {{duree}}", { moisActuel: niveauEnCours.moisActuel, duree: niveauEnCours.duree })}</span>
                </div>

                <div className="mt-6 h-2 w-full rounded-full bg-ivory-dark">
                  <div
                    className="h-2 rounded-full bg-coral transition-all duration-700"
                    style={{ width: `${Math.round(niveauEnCours.progression)}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  <span>{t("Début {{v0}}", { v0: formatDate(niveauEnCours.inscription.date_debut) })}</span>
                  <span>{t("Fin {{v0}}", { v0: formatDate(dateFinNiveau(niveauEnCours.inscription.date_debut, niveauEnCours.duree)) })}</span>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-ivory-dark/30 px-4 py-3">
                  <p className="flex items-center gap-1.5 font-body text-sm text-ink">
                    {niveauEnCours.moisAPayer === 0 ? (
                      <>
                        <HiOutlineCheckCircle size={16} className="text-coral-dark" />{" "}{t("Paiement à jour")}</>
                    ) : (
                      <>
                        <HiOutlineClock size={16} className="text-coral-dark" />{t(niveauEnCours.moisAPayer > 1 ? "{{v0}} restants à payer" : "{{v0}} restant à payer", { v0: pluriel(niveauEnCours.moisAPayer, "mois") })}</>
                    )}
                  </p>
                  <Link
                    to={`/eleve/formation/${niveauEnCours.niveau.name}`}
                    className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors hover:text-brick"
                  >{t("Voir le détail")}<HiOutlineArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </AnimatedSection>
            ) : (
              <AnimatedSection className="mt-6 rounded-2xl border border-dashed border-ivory-dark p-8 text-center">
                <HiOutlineMusicalNote size={22} className="mx-auto text-ink-soft" />
                <p className="mt-3 font-body text-sm text-ink-soft">
                  {niveauEnAttente
                    ? t("Ton niveau démarrera dès que ton inscription sera validée.")
                    : t("Tu n'as pas encore de niveau en cours.")}
                </p>
                <Link
                  to="/eleve/formation"
                  className="mt-4 inline-block font-body text-sm font-semibold text-coral-dark hover:text-brick"
                >
                  {niveauEnAttente ? t("Voir mon parcours") : t("Choisir un niveau")} →
                </Link>
              </AnimatedSection>
            )}
          </section>

          {/* --- Mes cours en cours ---
          <section>
            <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-display text-xl font-semibold text-ink">Mes cours en cours</h3>
              <Link
                to="/eleve/catalogue"
                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors hover:text-brick"
              >
                Voir le catalogue <HiOutlineArrowRight size={15} />
              </Link>
            </AnimatedSection>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {EN_COURS.map((c, i) => (
                <AnimatedSection
                  key={c.id}
                  delay={i * 90}
                  as={Link}
                  to={`/eleve/cours/${c.id}`}
                  className="group flex gap-4 rounded-2xl border border-ivory-dark bg-white/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl hover:shadow-coral/10 dark:bg-white/10"
                >
                  <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl text-2xl ${TONE_BG[c.tone]}`}>
                    <span className="opacity-90">{c.emoji}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-base font-semibold text-ink group-hover:text-coral-dark">{c.titre}</p>
                    <p className="mt-0.5 font-body text-sm text-ink-soft">avec {c.prof}</p>
                    <div className="mt-3 h-1.5 w-full rounded-full bg-ivory-dark">
                      <div className="h-1.5 rounded-full bg-coral transition-all duration-500" style={{ width: `${c.progression}%` }} />
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{c.progression}% terminé</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section> */}
        </div>

        {/* ===== Colonne latérale ===== */}
        <aside className="space-y-10">
          {/* --- À faire --- */}
          <section>
            <AnimatedSection>
              <h3 className="font-display text-xl font-semibold text-ink">{t("À faire")}</h3>
            </AnimatedSection>

            {aFaire.length === 0 ? (
              <AnimatedSection className="mt-6 rounded-2xl border border-dashed border-ivory-dark p-6 text-center">
                <HiOutlineCheckCircle size={22} className="mx-auto text-coral-dark" />
                <p className="mt-3 font-body text-sm text-ink-soft">{t("Rien d'urgent : tout est à jour.")}</p>
              </AnimatedSection>
            ) : (
              <div className="mt-6 space-y-3">
                {aFaire.map((a, i) => (
                  <AnimatedSection
                    key={a.id}
                    delay={i * 80}
                    as={Link}
                    to={a.to}
                    className={`group flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 ${
                      a.urgent
                        ? "border-coral/40 bg-coral/10 hover:shadow-lg hover:shadow-coral/10"
                        : "border-ivory-dark bg-white/60 hover:border-coral/40 dark:bg-white/10"
                    }`}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark transition-colors duration-300 group-hover:bg-coral group-hover:text-ivory">
                      <a.icon size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-body text-sm font-semibold text-ink">{a.titre}</span>
                      <span className="block truncate font-body text-xs text-ink-soft">{t(a.detail)}</span>
                    </span>
                    <span className="shrink-0 font-body text-xs font-semibold text-coral-dark">{t(a.cta)}</span>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </section>

          {/* --- Messages récents --- */}
          <section>
            <AnimatedSection className="flex items-end justify-between gap-4">
              <h3 className="font-display text-xl font-semibold text-ink">{t("Messages récents")}</h3>
              <Link
                to="/eleve/messages"
                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors hover:text-brick"
              >{t("Ouvrir")}{" "}<HiOutlineArrowRight size={15} />
              </Link>
            </AnimatedSection>

            {conversationsRecentes.length === 0 ? (
              <AnimatedSection className="mt-6 rounded-2xl border border-dashed border-ivory-dark p-6 text-center">
                <HiOutlineChatBubbleLeftRight size={22} className="mx-auto text-ink-soft" />
                <p className="mt-3 font-body text-sm text-ink-soft">{t("Écris à un professeur pour poser une question sur ton cours.")}</p>
              </AnimatedSection>
            ) : (
              <div className="mt-6 divide-y divide-ivory-dark overflow-hidden rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10">
                {conversationsRecentes.map((c) => {
                  const prof = (userList || []).find((u) => u.id === c.otherUserId);
                  const dernier = c.messages[c.messages.length - 1];
                  const envoyeParMoi = dernier?.sender_id === user?.id;
                  return (
                    <Link
                      key={c.otherUserId}
                      to="/eleve/messages"
                      className="flex items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-ivory-dark/40"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory-dark font-display text-xs font-semibold text-coral-dark">
                        {prof?.name?.slice(0, 1).toUpperCase()}
                        {prof?.firstname?.slice(0, 1).toUpperCase()}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-body text-sm font-semibold text-ink">
                          {prof ? `${prof.name} ${prof.firstname}` : t("Professeur")}
                        </span>
                        <span className="block truncate font-body text-xs text-ink-soft">
                          {envoyeParMoi ? t("Toi : ") : ""}
                          {dernier?.content}
                        </span>
                      </span>
                      {c.unreadCount > 0 && (
                        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-coral px-1.5 py-0.5 font-mono text-[10px] font-semibold leading-none text-white">
                          {c.unreadCount > 9 ? "9+" : c.unreadCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </aside>
      </div>

      {/* ---------- PARCOURS DES NIVEAUX ---------- */}
      {parcours.length > 0 && (
        <section>
          <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-xl font-semibold text-ink">{t("Mon parcours")}</h3>
            <Link
              to="/eleve/formation"
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors hover:text-brick"
            >{t("Tout voir")}{" "}<HiOutlineArrowRight size={15} />
            </Link>
          </AnimatedSection>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {parcours.map((p, i) => {
              const s = STATUT_NIVEAU[p.statut];
              const cliquable = p.statut === "en_cours" || p.statut === "termine";
              return (
                <AnimatedSection
                  key={p.niveau.id}
                  delay={i * 80}
                  as={cliquable ? Link : "div"}
                  {...(cliquable ? { to: `/eleve/formation/${p.niveau.name}` } : {})}
                  className={`rounded-2xl border p-5 transition-all duration-300 ${
                    p.statut === "en_cours"
                      ? "border-coral/50 bg-coral/5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-coral/10"
                      : "border-ivory-dark bg-white/60 dark:bg-white/10"
                  } ${p.statut === "non_inscrit" ? "opacity-70" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-display text-base font-semibold text-ink">{capitalize(p.niveau.name)}</p>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${s.badge}`}>
                      {t(s.label)}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    {p.niveau.duree}
                  </p>
                  {p.statut === "en_cours" && (
                    <div className="mt-3 h-1.5 w-full rounded-full bg-ivory-dark">
                      <div className="h-1.5 rounded-full bg-coral" style={{ width: `${Math.round(p.progression)}%` }} />
                    </div>
                  )}
                </AnimatedSection>
              );
            })}
          </div>
        </section>
      )}

      {/* ---------- ACCÈS RAPIDES ---------- */}
      <section className="grid gap-4 sm:grid-cols-3">
        {QUICK_LINKS.map((l, i) => (
          <AnimatedSection
            key={l.to}
            delay={i * 80}
            as={Link}
            to={l.to}
            className="group flex items-center gap-3 rounded-2xl border border-ivory-dark bg-ivory-dark/40 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral/40 hover:bg-white dark:hover:bg-ivory-dark"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark transition-colors duration-300 group-hover:bg-coral group-hover:text-ivory">
              <l.icon size={17} />
            </span>
            <span className="font-body text-sm font-semibold text-ink">{t(l.label)}</span>
            <HiOutlineArrowRight className="ml-auto text-ink-soft opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" size={15} />
          </AnimatedSection>
        ))}
      </section>
    </div>
  );
}

export default function Dashboard() {
  const users = useUser();
  const paiements = usePaiement();
  const niveaux = useLevel();
  const messages = useMessage();

  return (
    <DataGate
      sources={[
        {
          label: "Chargement des niveaux",
          loading: niveaux.loading,
          error: niveaux.error,
          retry: niveaux.fecthLevels,
        },
        {
          label: "Chargement des paiements",
          loading: paiements.loading,
          error: paiements.error,
          retry: paiements.fetchPaiement,
        },
        {
          label: "Chargement des professeurs",
          loading: users.loading,
          error: users.error,
          retry: users.fetchUserList,
        },
        {
          label: "Chargement des messages",
          loading: messages.loading,
          error: messages.error,
          retry: messages.fetchMessages,
        },
      ]}
    >
      <DashboardContent />
    </DataGate>
  );
}
