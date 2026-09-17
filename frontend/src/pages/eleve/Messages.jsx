import { useEffect, useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { getMessages, storeMessage } from "../../app/api/messageApi";
import { useUser } from "../../app/hooks/useUser";

export default function Messages() {
  const [activeProf, setActiveProf] = useState(null);
  const [draft, setDraft] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const { userList } = useUser();
  const professeurs = userList.filter((user) => user.role?.name === "professeur");

  const fetchMessages = async () => {
    try {
      const response = await getMessages();
      setConversations(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error.response?.data || error.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (professeurs.length === 0) {
      setActiveProf(null);
      return;
    }

    setActiveProf((current) => professeurs.find((professeur) => professeur.id === current?.id) || professeurs[0]);
  }, [userList]);

  const activeConversation = conversations.find((conversation) => conversation.profId === activeProf?.id) || null;

  const handleSend = async () => {
    const content = draft.trim();
    if (!content || !activeProf) return;

    try {
      await storeMessage({ receiver_id: activeProf.id, content });
      setDraft("");
      await fetchMessages();
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error.response?.data || error.message);
    }
  };

  return (
    <AnimatedSection
      className="grid overflow-hidden rounded-2xl border border-ivory-dark bg-white/70 md:grid-cols-3"
      style={{ minHeight: "480px" }}
    >
      <div className="divide-y divide-ivory-dark border-b border-ivory-dark md:border-b-0 md:border-r">
        <div className="border-b border-ivory-dark px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-coral-dark">Nouveau message</p>
          <p className="mt-1 font-display text-base font-semibold text-ink">Choisir un professeur</p>
        </div>
        {professeurs.map((professeur) => (
          <button
            key={professeur.id}
            onClick={() => setActiveProf(professeur)}
            className={`w-full px-5 py-4 text-left transition-colors duration-200 ${
              activeProf?.id === professeur.id ? "bg-coral/10" : "hover:bg-ivory-dark/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory-dark font-display text-xs font-semibold text-coral-dark">
                {professeur.name?.slice(0, 1).toUpperCase()}{professeur.firstname?.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate font-body text-sm font-semibold text-ink">{professeur.name} {professeur.firstname}</p>
                <p className="mt-0.5 truncate font-body text-xs text-ink-soft">Professeur</p>
              </div>
            </div>
          </button>
        ))}
        {professeurs.length === 0 && (
          <p className="px-5 py-8 font-body text-sm text-ink-soft">Chargement des professeurs…</p>
        )}
      </div>

      <div className="flex flex-col md:col-span-2">
        {loadingMessages ? (
          <div className="grid flex-1 place-items-center p-6 text-center">
            <p className="font-body text-sm text-ink-soft">Chargement des conversations…</p>
          </div>
        ) : activeProf ? (
          <>
            <div className="border-b border-ivory-dark px-6 py-4">
              <p className="font-display text-sm font-semibold text-ink">{activeProf.name} {activeProf.firstname}</p>
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Professeur · Accompagnement personnalisé</p>
            </div>
            <div className="flex-1 space-y-3 p-6">
              {activeConversation ? (
                <div className="max-w-xs rounded-2xl rounded-tl-sm bg-ivory-dark/60 px-4 py-2.5 font-body text-sm text-ink">{activeConversation.extrait}</div>
              ) : (
                <p className="font-body text-sm text-ink-soft">Aucun message dans cette conversation.</p>
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
            <p className="font-body text-sm text-ink-soft">Sélectionne un professeur pour ouvrir la discussion.</p>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
