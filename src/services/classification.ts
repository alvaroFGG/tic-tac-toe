export const getclassification = async () => {
  const response = await fetch("/api/matches/classification");

  const data = await response.json();

  if (!data) {
    throw new Error("classification not found");
  }

  return data;
};
