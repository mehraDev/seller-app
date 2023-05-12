import styled from 'styled-components'

export const InventoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  padding: 20px;
`

export const InventoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const InventoryTitle = styled.h2`
  margin: 0;
`

export const InventoryControls = styled.div`
  display: flex;
`

export const InventoryControlButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 10px;
  border: none;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`

export const InventoryBodyWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`

export const InventoryItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
`

export const InventoryItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
`

export const InventoryItemTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  margin-bottom: 10px;
`

export const InventoryItemDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  margin-bottom: 10px;
`

export const InventoryItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const InventoryItemPrice = styled.span`
  font-weight: bold;
`

export const InventoryItemVegNonVeg = styled.span`
  color: ${({isVeg}) => (isVeg ? 'green' : 'red')};
`
