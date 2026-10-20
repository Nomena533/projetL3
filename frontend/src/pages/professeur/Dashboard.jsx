import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import {
  HiOutlineBookOpen,
  HiOutlineUsers,
  HiOutlineBanknotes,
  HiOutlineInbox,
  HiOutlineChatBubbleLeftRight,
  HiOutlineAcademicCap,
  HiOutlineChevronRight,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import StatCard from "../../components/StatCard";
import Pill from "../../components/Pill";
import { MES_COURS, SOUMISSIONS, TONE_BG } from "../../lib/mockProfData";
import useGetCour from "../../app/hooks/useGetCour";
import { capitalize, formatDate } from "../../lib/formatFunction";
import { BookOpen, ClipboardCheck } from "../../lib/icons";
import { useSoumission } from "../../app/hooks/useSoumission";
import { useAuth } from "../../app/hooks/useAuth";
import { useUser } from "../../app/hooks/useUser";
import { useMessage } from "../../app/hooks/useMessage";
import { useLang } from "../../app/hooks/useLang";
import { DataGate } from "../../components/AsyncState";

// const EN_ATTENTE = SOUMISSIONS.filter((s) => s.statut === "En attente");

const QUICK_LINKS = [
  { to: "/professeur/mescours", label: "Mes cours", icon: HiOutlineBookOpen },
  { to: "/professeur/eleves", label: "Mes élèves", icon: HiOutlineUsers },
  {
    to: "/professeur/messages",
    label: "Messages",
    icon: HiOutlineChatBubbleLeftRight,
  },
];

function ProfDashboardContent() {
  const { t } = useLang();
  const { courByProf, cours } = useGetCour();
  const { soumission } = useSoumission();
  const { user } = useAuth();
  const { conversations } = useMessage();
  const { userListInscription, fetchUserListInscription, userList } = useUser();

  const soumissionProf = soumission.filter(
    (s) => s.exercice.lesson.cour.prof_id === user.id,
  );

  console.log("soumissionProf : ", soumissionProf);

  const EN_ATTENTE = soumissionProf.filter((s) => s.statut === "en attente");

  const conversationsRecentes = [...(conversations || [])]
    .filter((c) => c.messages?.length)
    .sort((a, b) => (b.unreadCount || 0) - (a.unreadCount || 0))
    .slice(0, 3);
  const aFaire = [];

  return (
    <div className="space-y-10">
      {/* ---------- HERO ---------- */}
      <AnimatedSection className="relative overflow-hidden rounded-4xl bg-linear-to-br from-brick via-coral to-amber p-1 shadow-2xl shadow-brick/20">
        <div className="relative overflow-hidden rounded-[1.85rem] bg-ink/90 p-8 sm:p-10">
          <div className="relative z-10 max-w-lg">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-light">{t("Bonjour {{firstname}} {{name}}", { firstname: user.firstname, name: user.name })}</p>
            {soumissionProf.length === 0 ? (
              <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ivory sm:text-3xl">{t("Aucune soumission pour le moment")}</h2>
            ) : (
              <>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ivory sm:text-3xl">{t(EN_ATTENTE.length > 1 ? "{{length}} soumissions attendent ta correction." : "{{length}} soumission attend ta correction.", { length: EN_ATTENTE.length })}</h2>
                <Link
                  to="/professeur/corrections"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 font-body text-sm font-semibold text-brick shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >{t("Corriger maintenant")}<HiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </>
            )}
          </div>
          <ValihaMotif
            count={22}
            tone="amber"
            className="pointer-events-none absolute -right-4 top-0 h-full w-40 opacity-50"
          />
        </div>
      </AnimatedSection>

      {/* ---------- STATS ---------- */}
      <section className="grid gap-5 sm:grid-cols-2">
        <StatCard
          icon={HiOutlineBookOpen}
          label={t("Cours publiés")}
          value={courByProf.filter((c) => c.statut === "publié").length}
        />
        <StatCard
          icon={ClipboardCheck}
          label={t("Total soumissions")}
          value={soumissionProf.length}
          delay={160}
        />
      </section>

      {/* ---------- MES COURS ---------- */}
      <section>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-display text-xl font-semibold text-ink">{t("Mes cours")}</h3>
              <Link
                to="/professeur/mescours"
                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors hover:text-brick"
              >{t("Gérer mes cours")}{" "}<HiOutlineArrowRight size={15} />
              </Link>
            </AnimatedSection>
            {courByProf.length === 0 ? (
              <AnimatedSection className="mt-6 rounded-2xl border border-dashed border-ivory-dark p-6 text-center">
                <HiOutlineBookOpen
                  size={22}
                  className="mx-auto text-ink-soft"
                />
                <p className="mt-3 font-body text-sm text-ink-soft">{t("Vous n'avez pas encore de cours publié")}</p>
              </AnimatedSection>
            ) : (
              <div
                className={` mt-6 ${courByProf.length > 1 ? "grid gap-5 md:grid-cols-2" : ""}`}
              >
                {courByProf.slice(0, 2).map((c, i) => (
                  <AnimatedSection
                    key={c.id}
                    delay={i * 90}
                    as={Link}
                    to={`/professeur/cours/${c.id}/details`}
                    className="group flex gap-4 rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl hover:shadow-coral/10"
                  >
                    <div
                      className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl text-2xl bg-coral/90`}
                    >
                      <span className="opacity-90">
                        <BookOpen className="text-white" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate font-display text-base font-semibold text-ink group-hover:text-coral-dark">
                          {capitalize(c.titre)}
                        </p>
                        <Pill>{t(c.statut)}</Pill>
                      </div>
                      <p className="mt-1.5 font-body text-sm text-ink-soft">{t("Instruments : {{name}}", { name: c.instrument.name })}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-10">
            {/* --- Messages récents --- */}
            <section>
              <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-ink">{t("Messages récents")}</h3>
                <Link
                  to="/professeur/messages"
                  className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors hover:text-brick"
                >{t("Ouvrir")}{" "}<HiOutlineArrowRight size={15} />
                </Link>
              </AnimatedSection>

              {conversationsRecentes.length === 0 ? (
                <AnimatedSection className="mt-10 rounded-2xl border border-dashed border-ivory-dark p-6 text-center">
                  <HiOutlineChatBubbleLeftRight
                    size={22}
                    className="mx-auto text-ink-soft"
                  />
                  <p className="mt-3 font-body text-sm text-ink-soft">{t("Les messages envoyés par les élèves.")}</p>
                </AnimatedSection>
              ) : (
                <div className="mt-10 divide-y divide-ivory-dark overflow-hidden rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10">
                  {conversationsRecentes.map((c) => {
                    const prof = (userList || []).find(
                      (u) => u.id === c.otherUserId,
                    );
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
                            {prof
                              ? `${prof.name} ${prof.firstname}`
                              : t("Professeur")}
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
          </div>
        </div>
      </section>

      {/* ---------- SOUMISSIONS RÉCENTES ---------- */}
      <section>
        <AnimatedSection>
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">{t("À traiter")}</span>
          <h3 className="mt-2 font-display text-xl font-semibold text-ink">{t("Dernières soumissions")}</h3>
        </AnimatedSection>

        {EN_ATTENTE.length === 0 ? (
          <AnimatedSection className="mt-6 rounded-2xl border border-dashed border-ivory-dark p-6 text-center">
            <ClipboardCheck
              size={22}
              className="mx-auto text-ink-soft"
            />
            <p className="mt-3 font-body text-sm text-ink-soft">{t("Aucune soumission en attente ne vous attend.")}</p>
          </AnimatedSection>
        ) : (
          <div className="mt-6 space-y-3">
            {EN_ATTENTE.slice(0, 3).map((s, i) => {
              const niveauNom = s.exercice.lesson.cour.level.name;
              const coursNom = s.exercice.lesson.cour.titre;
              const leconNom = s.exercice.lesson.titre;
              const eleveNom = `${s.eleve.name} ${s.eleve.firstname}`;
              return (
                <AnimatedSection
                  key={s.id}
                  delay={i * 80}
                  className="flex items-center gap-4 rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber/15 text-brick">
                    <HiOutlineInbox size={17} />
                  </span>
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="truncate font-body text-sm font-semibold text-ink">
                      {s.exercice.titre}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                      <span className="flex items-center gap-1">
                        <HiOutlineAcademicCap
                          size={13}
                          className="text-coral-dark"
                        />
                        {niveauNom}
                      </span>
                      <HiOutlineChevronRight size={11} />
                      <span className="flex items-center gap-1">
                        <HiOutlineBookOpen
                          size={13}
                          className="text-coral-dark"
                        />
                        {coursNom}
                      </span>
                      <HiOutlineChevronRight size={11} />
                      <span>{leconNom}</span>
                    </div>
                    <p className="mt-0.5 font-body text-xs text-ink-soft">{t("{{eleveNom}} . Le {{v0}}", { eleveNom, v0: formatDate(s.created_at) })}</p>
                  </div>
                  <Pill>{t(s.statut)}</Pill>
                </AnimatedSection>
              );
            })}
          </div>
        )}
      </section>

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
            <span className="font-body text-sm font-semibold text-ink">
              {t(l.label)}
            </span>
            <HiOutlineArrowRight
              className="ml-auto text-ink-soft opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              size={15}
            />
          </AnimatedSection>
        ))}
      </section>
    </div>
  );
}

export default function ProfDashboard() {
  const cours = useGetCour();
  const soumissions = useSoumission();
  const messages = useMessage();
  const users = useUser();

  return (
    <DataGate
      sources={[
        {
          label: "Chargement de vos cours",
          loading: cours.loading,
          error: cours.error,
          retry: cours.fetchCours,
        },
        {
          label: "Chargement des soumissions",
          loading: soumissions.loading,
          error: soumissions.error,
          retry: soumissions.fetchSoumission,
        },
        {
          label: "Chargement des messages",
          loading: messages.loading,
          error: messages.error,
          retry: messages.fetchMessages,
        },
        {
          label: "Chargement des élèves",
          loading: users.loading,
          error: users.error,
          retry: users.fetchUserList,
        },
      ]}
    >
      <ProfDashboardContent />
    </DataGate>
  );
}
