export const formatDate = (date) => {
  const formatted = new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export function formatAriary(n) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}