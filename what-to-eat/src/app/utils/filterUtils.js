export const toggleItem = (prevItems, item) => {
    const isRestaurant = typeof item === 'object' && item !== null && 'id' in item;

    const itemIdentifier = isRestaurant ? item.id : item;

    const isIncluded = isRestaurant 
        ? prevItems.some(prevItem => prevItem.id === itemIdentifier)
        : prevItems.includes(itemIdentifier);

    if (isIncluded) {
        return isRestaurant
        ? prevItems.filter(i => i.id !== itemIdentifier)
        : prevItems.filter(i => i !== itemIdentifier);
    } else {
        return [...prevItems, item];
    }
    }

