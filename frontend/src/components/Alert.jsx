import { HiOutlineCheckCircle, HiOutlineExclamationTriangle, HiOutlineXMark } from "react-icons/hi2";
import { useLang } from "../app/hooks/useLang";

function Alert({ type = "success", message, onClose }) {
  const { t } = useLang();
  const isSuccess = type === "success";
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border px-5 py-4 font-body text-sm ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-brick/30 bg-brick/10 text-brick"
      }`}
    >
      {isSuccess ? (
        <HiOutlineCheckCircle size={18} className="mt-0.5 shrink-0" />
      ) : (
        <HiOutlineExclamationTriangle size={18} className="mt-0.5 shrink-0" />
      )}
      <p className="flex-1">{message}</p>
      <button
        onClick={onClose}
        aria-label={t("Fermer")}
        className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
      >
        <HiOutlineXMark size={16} />
      </button>
    </div>
  );
}

export default Alert;