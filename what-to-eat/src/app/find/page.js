'use client';

import { useState, useEffect } from 'react';
import { Circle } from '../components/circle';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import styles from './find.module.css';


export default function Find() {
  const [userPosition, setUserPosition] = useState(null);
  const [sliderDistance, setSliderDistance] = useState(2.0);
  const [restaurants, setRestaurants] = useState([]);
  const [distance, setDistance] = useState(2.0);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('$$$$');

  const priceLevelMap = {
  "PRICE_LEVEL_INEXPENSIVE": 1,
  "PRICE_LEVEL_MODERATE": 2,
  "PRICE_LEVEL_EXPENSIVE": 3,
  "PRICE_LEVEL_VERY_EXPENSIVE": 4
  };

  useEffect(() => {

    const fetchRestaurants = async () => {
      if (!userPosition) return;
      
      const response = await fetch('/api/search', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: userPosition.lat,
          longitude: userPosition.lng,
          radius: distance * 1000,
        })
      });

      const data = await response.json();

      if (data.places) {
        console.log(data);
        setRestaurants(data.places);
      } else {
        setRestaurants([]);
      }
    }
  
    fetchRestaurants();

  }, [userPosition, distance, selectedCuisines, selectedPrice])

    // NEW: Add this useEffect to handle the debouncing
  useEffect(() => {
    // Set a timer
    const handler = setTimeout(() => {
      setDistance(sliderDistance);
    }, 300); // 300ms delay
    
    return () => {
      clearTimeout(handler);
    };
  }, [sliderDistance]);


  const filteredRestaurants = restaurants.filter(restaurant => {

    const cuisineMatch = selectedCuisines.length === 0 || selectedCuisines.some(cuisine => restaurant.types.includes(cuisine.toLowerCase().replace(' ', '_')));
    const priceMatch = priceLevelMap[restaurant.priceLevel] <= selectedPrice.length;

    return cuisineMatch && priceMatch;
});
  
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
          // Fallback to Los Angeles, CA if location is denied
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
    setSelectedPrice("$$")
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
             <input 
                type="range"
                min="1"
                max="4"
                className={styles.slider}
                value={selectedPrice.length}
                onChange={(e) => {
                  const priceLables = ["$", "$$", "$$$", "$$$$"];
                  setSelectedPrice(priceLables[e.target.value - 1]);
                }} 
              />
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
                step="0.5"
                value={sliderDistance}
                onChange={(e) => setSliderDistance(parseFloat(e.target.value))}
                className={styles.slider} 
             />
             <div className={styles.sliderLabels}>
                <span>0.5km</span>
                <span className={styles.distanceValue}>{sliderDistance.toFixed(1)} km</span>                
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
                {filteredRestaurants.map(r => 
                <AdvancedMarker 
                key={r.id} 
                position={{lat: r.location.latitude, lng: r.location.longitude}} 
                title={r.displayName.text} />)}
                <Circle
                center = {userPosition}
                radius={distance * 1000}
                strokeColor="#007cff"
                strokeOpacity={0.8}
                strokeWeight={2}
                fillColor="#007cff"
                fillOpacity={0.2}
                />
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
            {filteredRestaurants.map(restaurant => {
              const priceString = '$'.repeat(restaurant.priceLevel);

            return (
              <div key={restaurant.id} className={styles.restaurantCard}>
                <div className={styles.cardHeader}>
                  <h4 className={styles.cardTitle}>{restaurant.displayName.text}</h4>
                  <div className={styles.cardRating}>⭐ {restaurant.rating}</div>
                </div>
                <div className={styles.cardDetails}>
                  <span className={styles.price}>{priceString}</span>
                </div>
              </div>
            );
          })}
          </div>
          </div>
        </main>
      </div>
    </APIProvider>
  );
}