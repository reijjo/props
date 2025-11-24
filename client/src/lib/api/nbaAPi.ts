export const getLeaders = async (stat: string) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/api/nba/leaders?stat=${stat}`,
      { cache: "no-store" }
    );
    return data.json();
  } catch (error) {
    console.error("Error fetching NBA leaders:", error);
  }
};
