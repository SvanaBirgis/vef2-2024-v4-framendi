'use client'
import Image from "next/image";
import useSWR from 'swr'
import { Suspense, useEffect, useState } from "react";
import styles from "./page.module.css";
import GamesGrid from "@/components/gamesgrid/gamesgrid";
import AddGame from "@/components/addGame/addGame";
import { fetcher } from "@/utils/fetcher";
import { PacmanLoader } from "react-spinners";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [addGameerror, setAddGameError] = useState(null);
  const { data, isLoading, error, mutate } = useSWR(`/api/games`, fetcher)
  useEffect(() => {
    setGames(data);

    return () => {
      setGames([]);
    }
  }, [data])

  if (error) return <div>Failed to load..</div>
  if (isLoading) return <PacmanLoader color="white" />

  const handleAddGame = (newGame) => {
    console.log('handleAddGame', newGame)
    setGames([newGame, ...games]);
    setAddGameError(null);
  }

  const handleAddGameError = (error) => {
    setAddGameError(error);
  }

  const handleDeleteSuccess = (deletedGameId) => {
    setAddGameError(null);
    console.log('handleDeleteSuccess', deletedGameId)
    setGames(games.filter(game => game.id !== deletedGameId));

  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.addGameContainer}>
          {addGameerror && <div className={styles.error}>{addGameerror}</div>}
          <AddGame handleAddGame={handleAddGame} handleAddGameError={handleAddGameError} />
        </div>
        <div className={styles.container}>
          <GamesGrid games={games}
            showDeleteButton={true}ß
            handleDeleteSuccess={handleDeleteSuccess} />
        </div>
      </Suspense>
    </>
  );
}
