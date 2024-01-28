import React from "react";
import { Rating } from "primereact/rating";

export const showTrafficStatus = (report)=> {
    const status = report.traffic_status.toUpperCase();
    const genrateRating = () => {
        switch (status) {
            case "NO GAMES":
                return 0;
            case "LIGHT":
                return 2;
            case "BUSY":
                return 4;
            case "VERY BUSY":
                return 5;
        }
    }
    return <Rating readOnly cancel={false} value={genrateRating()}/>
}

export const showOperationalStatus = (report) => {
    let op_status = { good: 0, broken: 0, functional: 0 };
    const n_games = report.game_status.length;
    report.game_status.forEach((game) => {
        if (game && game.status === "Good")
            op_status.good++;
        else if (game && game.status === "Functional")
            op_status.functional++;
        else
            op_status.broken++;
    })

    let rating = 0;
    if (op_status.broken === 0 && op_status.functional === 0) { rating = 5; }
    else if (op_status.broken <= 1 && op_status.functional <= 1) { rating = 4; }
    else if (op_status.broken <= 2 && op_status.functional <= 2) { rating = 3; }
    else if (op_status.broken <= 3 && op_status.functional <= 3) { rating = 2; }
    else if (op_status.broken <= 3 && op_status.functional <= 4) { rating = 1; }
    // All games are good, 5 Stars
    // > 50% games are good, no broken games 4 Stars
    // > 40% games are good, with 1 broken game 3 stars
    // > 30% games are good, with 2 broken game 2 stars
    // > 20% games are good, with 2 broken game 2 stars
    return <Rating readOnly cancel={false} value={rating} />
}

export const showCleanlinessStatus = (report) => {
    const status = report.location_cleaned_status;
    const genrateRating = () => {
        switch (status) {
            case "Not Cleaned":
                return 1;
            case "Facility Cleaned":
                return 3;
            case "Facility Deep Cleaned":
                return 5;
        }
    }
    return <Rating readOnly cancel={false} value={genrateRating()} />
}