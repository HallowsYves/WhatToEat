export const cuisineTypeMap = {
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

export const priceLevelMap = {
  "PRICE_LEVEL_INEXPENSIVE": 1,
  "PRICE_LEVEL_MODERATE": 2,
  "PRICE_LEVEL_EXPENSIVE": 3,
  "PRICE_LEVEL_VERY_EXPENSIVE": 4
};

export const invertedCuisineTypeMap = Object.fromEntries(
  Object.entries(cuisineTypeMap).map(([key, value]) => [value, key])
);