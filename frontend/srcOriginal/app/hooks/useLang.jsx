import { useContext } from "react";
import { LangContext } from "../context/LangContext";

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang doit être utilisé à l'intérieur d'un <LangProvider>");
  }
  return ctx;
}