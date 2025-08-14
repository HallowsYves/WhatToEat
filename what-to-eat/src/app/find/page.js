'use client';

import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import styles from './find.module.css';

// Mock Data for demonstration purposes
const mockRestaurants = [
  {
    id: 1,
    name: 'Bella Vista Italian',
    cuisine: 'Italian',
    price: '$$$',
    rating: 4.5,
    isOpen: true,
    delivery: '25-35 min delivery',
    location: { lat: 33.9533, lng: -118.1637 }
  },
  {
    id: 2,
    name: 'Dragon Palace',
    cuisine: 'Chinese',
    price: '$$',
    rating: 4.2,
    isOpen: true,
    delivery: '30-40 min delivery',
    location: { lat: 33.9495, lng: -118.1712 }
  },
  {
    id: 3,
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    price: '$$',
    rating: 4.0,
    isOpen: false,
    delivery: '20-30 min delivery',
    location: { lat: 33.9601, lng: -118.1655 }
  },
  {
    id: 4,
    name: 'Sakura Sushi',
    cuisine: 'Japanese',
    price: '$$$$',
    rating: 4.7,
    isOpen: true,
    delivery: '35-45 min delivery',
    location: { lat: 33.9550, lng: -118.1580 }
  }
];


export default function Find() {
  const [userPosition, setUserPosition] = useState(null);
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [distance, setDistance] = useState(2.0);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  
  const cuisineTypes = ['Italian', 'Chinese', 'Mexican', 'Japanese', 'American', 'Indian', 'Thai', 'French', 'Mediterranean', 'Fast Food', 'Pizza', 'Sushi'];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        () => {
          // Fallback to Paramount, CA if location is denied
          setUserPosition({ lat: 33.9546, lng: -118.1637 });
        }
      );
    } else {
      // Fallback for browsers that don't support Geolocation
      setUserPosition({ lat: 33.9546, lng: -118.1637 });
    }
  }, []);

  const toggleCuisine = (cuisine) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine) 
        ? prev.filter(c => c !== cuisine) 
        : [...prev, cuisine]
    );
  };
  
  const clearFilters = () => {
    setSelectedCuisines([]);
    setDistance(2.0);
    // You can add budget clearing logic here as well
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS}>
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Cuisine Filter */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Cuisine Types</h3>
            <div className={styles.cuisineGrid}>
              {cuisineTypes.map(cuisine => (
                <button 
                  key={cuisine}
                  onClick={() => toggleCuisine(cuisine)}
                  className={`${styles.cuisineButton} ${selectedCuisines.includes(cuisine) ? styles.activeCuisine : ''}`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Filter - Placeholder */}
           <div className={styles.filterGroup}>
             <h3 className={styles.filterTitle}>Budget Range</h3>
             <input type="range" min="1" max="4" defaultValue="4" className={styles.slider} />
             <div className={styles.sliderLabels}>
                <span>$</span>
                <span>$$</span>
                <span>$$$</span>
                <span>$$$$</span>
             </div>
           </div>

          {/* Distance Filter */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Search Distance</h3>
             <input 
                type="range" 
                min="0.5" 
                max="10" 
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(parseFloat(e.target.value))}
                className={styles.slider} 
             />
             <div className={styles.sliderLabels}>
                <span>0.5km</span>
                <span className={styles.distanceValue}>{distance.toFixed(1)} km</span>
                <span>10km</span>
             </div>
          </div>
          
          <button onClick={clearFilters} className={styles.clearButton}>Clear All Filters</button>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.mapContainer}>
            <h2 className={styles.sectionTitle}>Restaurant Map</h2>
            {userPosition ? (
              <Map
                defaultCenter={userPosition}
                defaultZoom={14}
                mapId={process.env.NEXT_PUBLIC_MAP_ID || 'what-to-eat-map'}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
              >
                <AdvancedMarker position={userPosition} title={'Your Location'}>
                     <div className={styles.userMarker}></div>
                </AdvancedMarker>
                {restaurants.map(r => <AdvancedMarker key={r.id} position={r.location} title={r.name} />)}
              </Map>
            ) : (
              <div className={styles.loading}>
                <p>Loading map and getting your location...</p>
              </div>
            )}
          </div>
          
          <div className={styles.listContainer}>
            <h2 className={styles.sectionTitle}>Nearby Restaurants</h2>
            <p className={styles.resultsFound}>{restaurants.length} restaurants found</p>
            <div className={styles.restaurantList}>
              {restaurants.map(restaurant => (
                <div key={restaurant.id} className={styles.restaurantCard}>
                  <div className={styles.cardHeader}>
                    <h4 className={styles.cardTitle}>{restaurant.name}</h4>
                    <div className={styles.cardRating}>⭐ {restaurant.rating}</div>
                  </div>
                  <div className={styles.cardDetails}>
                    <span>{restaurant.cuisine}</span>
                    <span className={styles.price}>{restaurant.price}</span>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={restaurant.isOpen ? styles.open : styles.closed}>
                      {restaurant.isOpen ? 'Open now' : 'Closed'}
                    </span>
                    <span>{restaurant.delivery}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </APIProvider>
  );
}