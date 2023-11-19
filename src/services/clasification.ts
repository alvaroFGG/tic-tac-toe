export const getClasification = async () => {
  const response = await fetch("/api/matches/clasification");

  const data = await response.json();

  if (!data) {
    throw new Error("Clasification not found");
  }

  return data;
};
