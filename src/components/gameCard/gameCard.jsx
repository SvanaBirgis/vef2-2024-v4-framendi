import React from "react";
import styles from "./gameCard.module.css";
import Link from "next/link";
import GameDate from "../gameDate/gameDate";
import Image from "next/image";
import DeleteButton from "../deleteButton/deleteButton";

export default function GameCard({ game, showDeleteButton, handleDeleteSuccess }) {
    if (!game) {
        return null;
    }

    return (
        <div className={styles.gameContainer} key={game.id}>
            <Link href={`/games/${game.id}`} className={styles.gameLink}>
                <div className={styles.dateContainer}>
                    <GameDate date={new Date(game.date)} />
                </div>
                <div className={styles.teamsContainer}>
                    <div className={styles.homeName}>
                        {game.home.name}
                    </div>
                    <div className={styles.vs}>
                        VS
                    </div>
                    <div className={styles.awayName}>
                        {game.away.name}
                    </div>
                </div>
                <div className={styles.scoreContainer}>
                    <div className={styles.homeScore}>
                        {game.home.score}
                    </div>
                    <div className={styles.awayScore}>
                        {game.away.score}
                    </div>
                </div>

            </Link>
            {showDeleteButton && <DeleteButton gameId={game.id} handleDeleteSuccess={handleDeleteSuccess}/>}
        </div>
    );

}