'use client'
import Image from "next/image";
import styles from "./deleteButton.module.css";
import { PacmanLoader } from "react-spinners";
import { useState } from "react";


export default function DeleteButton({ gameId, handleDeleteSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    async function deleteGameById(id) {
        const res = await fetch(`api/games/${id}`, {
            method: "DELETE",
        });
        console.log('res', res)
        if (res.ok) {
            console.info("Game deleted successfully");
            handleDeleteSuccess(id); // Call the callback function on successful deletion
        } else {
            setError("Error deleting game");
            console.error("Error deleting game");
            console.error(await res.json());
        }
        setLoading(false);
    }

    return (
        <div className={styles.deleteButtonContainer}>
            <button
                className={styles.deleteButton}
                onClick={(e) => {
                    setError(null);
                    setLoading(true);
                    e.preventDefault();
                    deleteGameById(gameId)}
                }
            >  
                {loading && <PacmanLoader color="white"/>}
                {!loading && <Image
                    src="./trash.svg"
                    alt=""
                    width={40}
                    height={45}
                    quality={100}
                />}

                {error && <div>{error}</div>}

            </button>
        </div>
    );
}


