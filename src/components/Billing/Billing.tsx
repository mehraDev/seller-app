import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  cursor: pointer;
  margin-bottom: 8px;

  &:hover {
    color: blue;
  }
`;

const UserPreview = styled.div`
  margin-top: 16px;
  border: 1px solid black;
  padding: 8px;
`;

const Billing = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const itemList = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 15 },
    { id: 3, name: 'Item 3', price: 20 },
    { id: 4, name: 'Item 4', price: 25 },
    { id: 5, name: 'Item 5', price: 30 },
  ];

  const handleItemSelect = (id) => {
    const selectedItem = itemList.find(item => item.id === id);
    setSelectedItems([...selectedItems, selectedItem]);
  };

  return (
    <Wrapper>
      <h1>Billing</h1>
      <ItemList>
        {itemList.map(item => (
          <Item key={item.id} onClick={() => handleItemSelect(item.id)}>
            {item.name} - ${item.price}
          </Item>
        ))}
      </ItemList>
      <UserPreview>
        <h3>Selected Items</h3>
        <ul>
          {selectedItems.map(item => (
            <li key={item.id}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      </UserPreview>
    </Wrapper>
  );
};

export default Billing;
