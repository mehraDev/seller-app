import React from 'react';
import FoodItem from './ProductItems/FoodItem';

interface ItemProps {
  item: {
    name?: string;
    price?: number;
    veg?: boolean;
    image?: string;
    description?: string;
    itemType?: string;
    // Add any additional fields here as needed for each item type
  }
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const getItemType = (shopType: string): string => {
    // Define logic to determine item type based on shop type
    switch (shopType) {
      case 'grocery':
        return 'food';
      case 'furniture':
        return 'furniture';
      // Add cases for each shop type here
      default:
        return 'unknown';
    }
  };

  const itemType = item.itemType ?? 'food';

  switch (itemType) {
    case 'food':
      return (
        <FoodItem item={item}/>
      );
    case 'furniture':
      return (
        <div>
          <h2>{item.name}</h2>
          <p>Price: {item.price}</p>
          <img src={item.image} alt={item.name} />
          <p>{item.description}</p>
        </div>
      );
    // Add cases for each item type here
    default:
      return null; // Handle unknown item types gracefully
  }
};

export default Item;
