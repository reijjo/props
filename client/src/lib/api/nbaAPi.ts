// GET
// /api/nba/leaders?stat=WHATSTAT
// Gets leaders for a specific stat
export const getLeaders = async (stat: string) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/api/nba/leaders?stat=${stat}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!data.ok) {
      console.error(
        `Error fetching NBA leaders for stat "${stat}":`,
        data.status,
        data.statusText
      );
      return undefined;
    }

    return await data.json();
  } catch (error) {
    console.error("Error fetching NBA leaders:", error);
    return undefined;
  }
};

// GET
// /api/nba/today
// Gets the NBA games today
export const getTodaysGames = async () => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/api/nba/games`,
      {
        next: { revalidate: 600 },
      }
    );

    if (!data.ok) {
      console.error(
        "Error fetching NBA games today:",
        data.status,
        data.statusText
      );
      return undefined;
    }

    return await data.json();
  } catch (error) {
    console.error("Error fetching NBA games today:", error);
    return undefined;
  }
};
