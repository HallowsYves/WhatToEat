import { invertedCuisineTypeMap, priceLevelMap} from '../utils/cuisineUtils';
import styles from '../find/find.module.css';


export default function RestaurantCard({ restaurant, isSelected, toggleRestaurant }) {
  const priceString = restaurant.priceLevel ? '$'.repeat(priceLevelMap[restaurant.priceLevel]) : '';

  const displayCuisine = restaurant.types
    .map(type => invertedCuisineTypeMap[type])
    .find(name => name) || 'Restaurant';


  return (
    <div
      key={restaurant.id}
      className={`${styles.restaurantCard} ${isSelected ? styles.selectedCard : ''}`}
      onClick={() => toggleRestaurant(restaurant)}
    >
      <div className={styles.cardHeader}>
        <h4 className={styles.cardTitle}>{restaurant.displayName.text}</h4>
        <div className={styles.cardRating}>⭐{restaurant.rating}</div>
      </div>
      <div className={styles.cardDetails}>
        <span className={styles.price}>{priceString}</span>
        <span className={styles.cuisineType}>{displayCuisine}</span>
      </div>
    </div>
  );
}