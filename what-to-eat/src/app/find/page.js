'use client';

import { useState, useEffect } from 'react';
import { Circle } from '../components/circle';
import { APIProvider, Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import styles from './find.module.css';
import { toggleItem } from '../utils/filterUtils';


export default function Find() {
  const [userPosition, setUserPosition] = useState(null);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [sliderDistance, setSliderDistance] = useState(2.0);
  const [restaurants, setRestaurants] = useState([]);
  const [distance, setDistance] = useState(2.0);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('$$$$');


  const cuisineTypeMap = {
  'Italian': 'italian_restaurant',
  'Chinese': 'chinese_restaurant',
  'Mexican': 'mexican_restaurant',
  'Japanese': 'japanese_restaurant',
  'American': 'american_restaurant',
  'Indian': 'indian_restaurant',
  'Thai': 'thai_restaurant',
  'French': 'french_restaurant',
  'Pizza': 'pizza_restaurant',
  'Fast Food': 'fast_food_restaurant',
  'Sushi': 'sushi_restaurant',
  'Ramen': 'ramen_restaurant'
  };
  const priceLevelMap = {
  "PRICE_LEVEL_INEXPENSIVE": 1,
  "PRICE_LEVEL_MODERATE": 2,
  "PRICE_LEVEL_EXPENSIVE": 3,
  "PRICE_LEVEL_VERY_EXPENSIVE": 4
  };
  const cuisineTypes = Object.keys(cuisineTypeMap);

  const toggleRestaurant = (restaurant) => {
    const newSelection = toggleItem(selectedRestaurants, restaurant);
    setSelectedRestaurants(newSelection);
  }

  const toggleCuisine = (cuisine) => {
  const newCuisines = toggleItem(selectedCuisines, cuisine);
  setSelectedCuisines(newCuisines);
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDistance(sliderDistance);
    }, 300); 
    
    return () => {
      clearTimeout(handler);
    };
  }, [sliderDistance]);


  const filteredRestaurants = restaurants.filter(restaurant => {
    const cuisineMatch = selectedCuisines.length === 0 || 
      selectedCuisines.some(cuisine => {
    const apiCuisineType = cuisineTypeMap[cuisine]; 
    return restaurant.types.includes(apiCuisineType);
  });
    const priceMatch = priceLevelMap[restaurant.priceLevel] <= selectedPrice.length;

    return cuisineMatch && priceMatch;
});

const restaurantMap = new Map();
filteredRestaurants.forEach(r => restaurantMap.set(r.id, r));
selectedRestaurants.forEach(r => restaurantMap.set(r.id, r));
const displayRestaurants = Array.from(restaurantMap.values());
  



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
              <GoogleMap
                defaultCenter={userPosition}
                defaultZoom={14}
                mapId={process.env.NEXT_PUBLIC_MAP_ID || 'what-to-eat-map'}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
              >
                <AdvancedMarker position={userPosition} title={'Your Location'}>
                     <div className={styles.userMarker}></div>
                </AdvancedMarker>
                {displayRestaurants.map(r => 
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
              </GoogleMap>
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
            {displayRestaurants.map(restaurant => {
              const priceString = '$'.repeat(restaurant.priceLevel);
              const isSelected = selectedRestaurants.some(r => r.id === restaurant.id);

            return (
              <div 
                key={restaurant.id} 
                className={`${styles.restaurantCard} ${isSelected ? styles.selectedCard : ''}`}
                onClick={() => toggleRestaurant(restaurant)}
              >
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