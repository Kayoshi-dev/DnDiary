export const extractFolderAndFile = (path: string) => {
  const parts = path.split("/");
  const folder = parts[3];
  const file = parts.slice(4).join("/");
  return {
    folder,
    file,
  };
};
