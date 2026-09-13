export const formatDate = (date) => {
  const formatted = new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatAriary = (n) => {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}