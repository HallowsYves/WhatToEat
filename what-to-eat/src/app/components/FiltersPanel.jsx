'use client';

import styles from '../css/find.module.css';

export default function FiltersPanel({ radius, setRadius}) {
    return (
        <div className={styles.filtersContent}>
            <h2>Filters</h2>
            <div className={styles.filterItem}>
                <label htmlFor="radius-slider">
                    Search Radius: {(radius / 1000).toFixed(1)} km
                </label>

                <input
                id="radius-slider"
                type="range"
                min="500"
                max="50000"
                step="500"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className={styles.slider}
                />
            </div>
            <button className={styles.searchButton}> Find Restaurants </button>
        </div>
    );
}