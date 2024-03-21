'use client'
import React from "react";
import styles from "./addGame.module.css";
import Image from "next/image";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { getPostBodyByFormData } from "../../utils/addGameByFormData"

export default function AddGame({handleAddGame, handleAddGameError}) {
    const { data, isLoading, error } = useSWR(`/api/teams`, fetcher);

    if (error) return <div>Failed to load teams..</div>
    if (isLoading) return <div>Loading teams...</div>

    async function onSubmit(event) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget);
        console.log('formData', formData.values);
        console.log(formData.get('home'))
        const postBody = await getPostBodyByFormData(formData);
        console.log('postBody', postBody);
        const res = await fetch('/api/games', {
          method: 'POST',
          body: JSON.stringify(postBody),
        })
     
        if (res.ok) {
            const game = await res.json();
            handleAddGame(game)
        } else {
            console.error('Failed to add game');
            handleAddGameError("Failed to add game")
        }
      }
    

    return (
        <div className={styles.container}>
            <div className={styles.addGameTitle}>
                <h1>Add Game</h1>
            </div>
            <form onSubmit={onSubmit}>
                <label className={styles.dateContainer}>
                    <p className={styles.dateTitle}>Date:</p>
                    <input type="datetime-local" name="date" />
                </label>
                <div className={styles.teamsContainer}>
                    <label className={styles.homeName}>
                        <p className={styles.homeNameTitle}>Home Team:</p>
                        <select name="home" >
                            {data.map(team => (
                                <option value={team.id} key={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </label>
                    <div className={styles.vs}>
                        VS
                    </div>
                    <label className={styles.awayName}>
                        <p className={styles.awayNameTitle}>Away Team:</p>
                        <select name="away" >
                            {data.map(team => (
                                <option value={team.id} key={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className={styles.scoreContainer}>
                    <label className={styles.homeScore}>
                        <p className={styles.homeScoreTitle}>Home Score:</p>
                        <input type="number" name="homeScore" min={0} />
                    </label>
                    <label className={styles.awayScore}>
                        <p className={styles.awayScoreTitle}>Away Score:</p>
                        <input type="number" name="awayScore" min={0} />
                    </label>
                </div>
                <div className={styles.addGameButtonContainer}>
                    <button type="submit" className={styles.addButton}><Image
                        src="/check.png"
                        width={40}
                        height={45}
                        quality={100}
                    /></button>
                </div>
            </form>
        </div>
    );
}