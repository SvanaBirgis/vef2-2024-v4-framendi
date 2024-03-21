import Image from "next/image";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import GamesGrid from "@/components/gamesgrid/gamesgrid";
import GameDate from "@/components/gameDate/gameDate";


async function getGame(id) {
  const res = await fetch(`${process.env.API_URL}/games/${id}`);
  let game = await res.json();

  return game;
}

export default async function GamePage({ params }) {
  const game = await getGame(params.id);

  console.log('game', game);

  if (!game) {
    return notFound();
  }

  return (
    <main className={styles.container}>
      <div className={styles.dateContainer}>
        <div className={styles.date}>
          <GameDate date={new Date(game.date)} />
        </div>
      </div>
      <div className={styles.gameContainer}>
        <div className={styles.homeName}>
          {game.home.name}
        </div>
        <div className={styles.gameScore}>
          <div>{game.home.score}</div>
          <div>-</div>
          <div>{game.away.score}</div>
        </div>
        <div className={styles.awayName}>
          {game.away.name}
        </div>
      </div>
    </main>
  );
}
