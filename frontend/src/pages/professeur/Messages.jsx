import { useEffect, useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { INSCRIPTIONS } from "../../lib/mockProfData";
import { useMessage } from "../../app/hooks/useMessage";
import { useUser } from "../../app/hooks/useUser";

export default function ProfMessages() {
  // const [active, setActive] = useState(INSCRIPTIONS[0]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const { conversations, fetchMessages } = useMessage();
  console.log("conversations : ", conversations);
  const [activeConversation, setActiveConversation] = useState(null);
  const { userList } = useUser();
  const eleves = userList.filter((user) => user.role?.name === "eleve");

  useEffect(() => {
    if (conversations.length !== 0) {
      setLoading(false);
    }
  }, [conversations]);

  useEffect(() => {
    if (conversations.length === 0) {
      setActiveConversation(null);
      return;
    }

    setActiveConversation(
      (current) =>
        conversations.find((c) => c.id === current?.id) || conversations[0],
    );
  }, [conversations]);

  const handleSend = async () => {
    const content = draft.trim();
    if (!content || !activeProf) return;

    try {
      await storeMessage({ receiver_id: activeConversation.otherUserId, content });
      setDraft("");
      await fetchMessages();
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du message :",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Espace professeur
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Messages
        </h2>
      </AnimatedSection>

      <AnimatedSection
        delay={80}
        className="grid overflow-hidden rounded-2xl border border-ivory-dark bg-white/70 md:grid-cols-3"
        style={{ minHeight: "440px" }}
      >
        <div className="divide-y divide-ivory-dark border-b border-ivory-dark md:border-b-0 md:border-r">
          <div className="border-b border-ivory-dark px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-coral-dark">
              Vos messages
            </p>
          </div>
          {conversations.map((c) => {
            const eleve = eleves.find((e) => e.id === c.otherUserId);
            return (
              <button
                key={c.id}
                onClick={() => setActiveConversation(c)}
                className={`w-full px-5 py-4 text-left transition-colors duration-200 ${
                  activeConversation?.id === c.id
                    ? "bg-coral/10"
                    : "hover:bg-ivory-dark/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  {eleve && (
                    <>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory-dark font-display text-xs font-semibold text-coral-dark">
                        {eleve.name?.slice(0, 1).toUpperCase()}
                        {eleve.firstname?.slice(0, 1).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-body text-sm font-semibold text-ink">
                          {eleve.name} {eleve.firstname}
                        </p>
                        <p className="mt-0.5 truncate font-body text-xs text-ink-soft">
                          {c.extrait}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </button>
            );
          })}
          {conversations.length === 0 && (
            <p className="px-5 py-8 font-body text-sm text-ink-soft">
              Chargement des eleves...
            </p>
          )}
        </div>

        <div className="flex flex-col md:col-span-2">
          {loading ? (
            <div className="grid flex-1 place-items-center p-6 text-center">
              <p className="font-body text-sm text-ink-soft">
                Chargement des conversations…
              </p>
            </div>
          ) : activeConversation ? (
            <>
              <div className="border-b border-ivory-dark px-6 py-4">
                <p className="font-display text-sm font-semibold text-ink">
                  {activeConversation.otherUser}
                </p>
                {/* <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  Professeur · Accompagnement personnalisé
                </p> */}
              </div>
              <div className="flex-1 space-y-3 p-6">
                {activeConversation ? (
                  <div className="max-w-xs rounded-2xl rounded-tl-sm bg-ivory-dark/60 px-4 py-2.5 font-body text-sm text-ink">
                    {activeConversation.extrait}
                  </div>
                ) : (
                  <p className="font-body text-sm text-ink-soft">
                    Aucun message dans cette conversation.
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 border-t border-ivory-dark p-4">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Écrire un message…"
                  className="flex-1 rounded-full border border-ivory-dark bg-white/70 px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
                />
                <button
                  onClick={handleSend}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral text-ivory shadow-md shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
                  aria-label="Envoyer"
                >
                  <HiOutlinePaperAirplane size={15} />
                </button>
              </div>
            </>
          ) : (
            <div className="grid flex-1 place-items-center p-6 text-center">
              <p className="font-body text-sm text-ink-soft">
                Sélectionne un professeur pour ouvrir la discussion.
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
