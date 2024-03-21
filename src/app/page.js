import Image from "next/image";
import styles from "./page.module.css";
import GamesGrid from "@/components/gamesgrid/gamesgrid";

async function getHomeGames() {
  try {

    const res = await fetch(`${process.env.API_URL}/games`, { cache: 'no-store' });
    let games = await res.json(); // Just get the 5 latest games by date
    games.sort((a, b) => new Date(b.date) - new Date(a.date));
    games = games.slice(0, 5);
    return games;
  } catch (error) {
    console.error("Failed to fetch games", error);
    return [];
  }
}

export default async function Home() {
  const games = await getHomeGames();
  // console.log('games', games);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Football League 2023-2024!</h1>
        <p className={styles.aboutContainer}> Step into the heart of the game with our interactive site, 
        your ultimate portal for the Football League 2023-2024! Here, every match played is at your 
        fingertips, with the power to dive deep into the action. But that&apos;s not all – you&apos;re in control! 
        Add or delete matches to tailor your experience, ensuring you&apos;re always in sync with the pulse of 
        the league. Embrace the excitement of the season and shape your journey through the thrilling world 
        of football! </p>
        {games?.length > 0 && <p className={styles.titleGameGrid}>Here you can see the 5 latest games that have been played.</p>}
        <GamesGrid games={games} showDeleteButton={false} />
      </div>

  );
}
