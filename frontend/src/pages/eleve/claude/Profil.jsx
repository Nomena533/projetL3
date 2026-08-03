import React from 'react'

export default function Profil() {
  return (
    <div className="max-w-xl bg-white border border-stone-200 rounded-sm p-6 space-y-4">
        <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center font-display text-2xl text-teal-950">FR</div>
        <div>
            <p className="font-display text-lg text-teal-950">Fara Rakoto</p>
            <p className="text-xs text-stone-500">Élève depuis février 2026</p>
        </div>
        </div>
        <Field label="Nom complet" placeholder="Fara Rakoto" />
        <Field label="E-mail" placeholder="fara.rakoto@mail.mg" icon={Mail} />
        <Field label="Téléphone" placeholder="+261 34 00 000 00" />
        <button className="bg-teal-950 text-stone-50 text-sm font-medium px-5 py-2.5 rounded-sm">Enregistrer les modifications</button>
    </div>
  )
}
