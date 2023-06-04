import React from 'react';
import Item from './InventoryItem';
import { InventoryBodyWrapper } from './InventoryStyles';

interface InventoryBodyProps {
  items: ItemProps[];
  view: 'card' | 'list';
  itemType: string;
}

interface ItemProps {
  id: number;
  name: string;
  description?: string;
  price?: number;
  quantity?: number;
  image?: string;
}

function InventoryBody({ items, view, itemType }: InventoryBodyProps) {
  return (
    <InventoryBodyWrapper>
      {items.map((item) =>
        view === 'card' ? <Item key={item.id} item={item} /> : <Item key={item.id} item={item} />,
      )}
    </InventoryBodyWrapper>
  );
}

export default InventoryBody;
