import React from "react";
import styles from "./gameDate.module.css";
import { format } from "date-fns";

export default function GameDate({ date }) {
    if (!date) {
        return null;
    }

    var formattedDate = format(date, "MMMM do, yyyy H:mma");
    
    return (
        <div className={styles.date}>
            {formattedDate}
        </div>
    );
}