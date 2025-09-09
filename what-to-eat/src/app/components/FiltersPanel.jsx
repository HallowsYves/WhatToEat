'use client';

import { useState } from 'react';
import styles from '../css/find.module.css';

export default function FiltersPanel() {
    const [activePrice, setActivePrice] = useState('$$');
    
    // Filters
    const distanceFilters = ['Driving', 'Biking', 'Walking', 'other']
    const categoryFilters = ['Italian', 'Mexican', 'Japanese','Chinese']

    return (
    <div className={styles.filtersContent}>
      {/* -- Price -- */}
        <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Price</h3>
        <div className={styles.priceButtons}>
        {['$', '$$', '$$$', '$$$$'].map((price) => (
            <button
            key={price}
            className={`${styles.priceButton} ${activePrice === price ? styles.active : ''}`}
            onClick={() => setActivePrice(price)}
            >
            {price}
            </button>
        ))}
        </div>
    </div>

    {/* -- Category -- */}
    <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}> Category</h3>
        <div className={styles.categoryPills}>
            {categoryFilters.map((filter) => (
                <button key={filter} className={styles.categoryPill}>{filter}</button>
            ))}
        </div>
        <a href="#" className={styles.seeAllLink}> See all </a>
    </div>

      {/* -- Distance -- */}
    <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Distance</h3>
        <div className={styles.radioGroup}>
        {distanceFilters.map((filter, index) => (
            <label key={filter} className={styles.radioLabel}>
            <input type="radio" name="distance" defaultChecked={index === 0} className={styles.radioInput} />
            <span>{filter}</span>
            </label>
        ))}
            </div>
        </div>
    </div>
    );
}