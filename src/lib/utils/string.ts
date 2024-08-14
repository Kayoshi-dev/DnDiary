export const slugify = (text: string) =>
  text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

export const firstLetterUppercase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getRandomId = () => {
  return Math.random().toString(36).substring(2, 11);
};
