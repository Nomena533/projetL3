import { useState } from "react";
import { useLang } from "../app/hooks/useLang";

// Hook + champs de carte bancaire partagés entre Formation.jsx et Paiement.jsx.
// NB : les valeurs sont envoyées telles quelles à l'API (comme avant). À remplacer par
// une tokenisation (Stripe ou équivalent) avant la mise en production : l'application
// ne doit pas stocker le numéro complet ni le CVV.

function expirationValide(valeur) {
  if (!/^\d{2}\/\d{2}$/.test(valeur)) return false;
  const mois = parseInt(valeur.slice(0, 2), 10);
  const annee = 2000 + parseInt(valeur.slice(3), 10);
  if (mois < 1 || mois > 12) return false;
  const finDuMois = new Date(annee, mois, 0, 23, 59, 59);
  return finDuMois >= new Date();
}

export function useChampsCarte(actif) {
  const [numero, setNumero] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  // Formatage "1234 5678 9012 3456" au fil de la saisie, 19 chiffres max.
  const onNumero = (e) => {
    const chiffres = e.target.value.replace(/\D/g, "").slice(0, 19);
    setNumero(chiffres.replace(/(.{4})/g, "$1 ").trim());
  };

  // Formatage "MM/AA" au fil de la saisie.
  const onExpiration = (e) => {
    const chiffres = e.target.value.replace(/\D/g, "").slice(0, 4);
    setExpiration(
      chiffres.length > 2 ? `${chiffres.slice(0, 2)}/${chiffres.slice(2)}` : chiffres,
    );
  };

  const onCvv = (e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));

  const numeroOk = numero.replace(/\s/g, "").length >= 13;
  const expirationOk = expirationValide(expiration);
  const cvvOk = cvv.length >= 3;

  return {
    numero,
    expiration,
    cvv,
    numeroOk,
    expirationOk,
    cvvOk,
    // Valide uniquement si le mode carte est choisi ; sinon ignoré.
    valide: !actif || (numeroOk && expirationOk && cvvOk),
    onNumero,
    onExpiration,
    onCvv,
    reset: () => {
      setNumero("");
      setExpiration("");
      setCvv("");
    },
    donnees: () => ({
      numero_carte: numero.replace(/\s/g, ""),
      expiration_carte: expiration,
      cvv_carte: cvv,
    }),
  };
}

const INPUT =
  "mt-1.5 w-full rounded-lg border bg-white px-3 py-2 font-body text-sm text-ink focus:outline-none";
const LABEL = "block font-mono text-[11px] uppercase tracking-wide text-ink-soft";

function bordure(valeur, ok) {
  return valeur && !ok
    ? "border-brick focus:border-brick"
    : "border-ivory-dark focus:border-coral";
}

export default function ChampsCarte({ champs, idPrefix = "carte" }) {
  const { t } = useLang();
  return (
    <div className="mt-4 grid gap-3 rounded-xl border border-ivory-dark bg-ivory-dark/20 p-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={LABEL} htmlFor={`${idPrefix}-numero`}>
          {t("Numéro de carte")}
        </label>
        <input
          id={`${idPrefix}-numero`}
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 5678 9012 3456"
          value={champs.numero}
          onChange={champs.onNumero}
          aria-invalid={Boolean(champs.numero) && !champs.numeroOk}
          className={`${INPUT} ${bordure(champs.numero, champs.numeroOk)}`}
        />
      </div>
      <div>
        <label className={LABEL} htmlFor={`${idPrefix}-expiration`}>
          {t("Expiration (MM/AA)")}
        </label>
        <input
          id={`${idPrefix}-expiration`}
          type="text"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="MM/AA"
          value={champs.expiration}
          onChange={champs.onExpiration}
          aria-invalid={champs.expiration.length === 5 && !champs.expirationOk}
          className={`${INPUT} ${bordure(champs.expiration.length === 5, champs.expirationOk)}`}
        />
      </div>
      <div>
        <label className={LABEL} htmlFor={`${idPrefix}-cvv`}>
          {t("CVV")}
        </label>
        <input
          id={`${idPrefix}-cvv`}
          type="password"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="•••"
          value={champs.cvv}
          onChange={champs.onCvv}
          className={`${INPUT} border-ivory-dark focus:border-coral`}
        />
      </div>
    </div>
  );
}
