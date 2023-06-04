import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {
  InventoryWrapper,
  InventoryHeader,
  InventoryTitle,
  InventoryControls,
  InventoryControlButton,
} from './InventoryStyles'
import InventoryBody from './InventoryBody'
import {loadMenuFromCurrentSeller} from '../../../firebaseServices/menu/sellerFunctions'
import FoodItem from './ProductItems/FoodItem'

function Inventory() {
  const menu = useSelector((state) => state.menu)
  const [items, setItems] = useState(menu.items)
  const [isListView, setIsListView] = useState(false)

  useEffect(
    () => {
    setItems(menu.items)
    console.log("items ", menu)
  },
   [menu]
  )

  const handleSortByPriceAscending = () => {
    loadMenuFromCurrentSeller(menu)
    console.log('calling loadMenuFromCurrentSeller')
    const sortedItems = [...items].sort((a, b) => a.price - b.price)
    setItems(sortedItems)
  }

  const handleSortByPriceDescending = () => {
    const sortedItems = [...items].sort((a, b) => b.price - a.price)
    setItems(sortedItems)
  }

  const handleToggleView = () => {
    setIsListView(!isListView)
  }

  if (items?.length === 0) {
    return <div>Loading items...</div>
  }

  return (
    <InventoryWrapper>
      <InventoryHeader>
        <InventoryTitle>Inventory</InventoryTitle>
        <InventoryControls>
          <InventoryControlButton onClick={handleSortByPriceAscending}>
            Sort by price ascending
          </InventoryControlButton>
          <InventoryControlButton onClick={handleSortByPriceDescending}>
            Sort by price descending
          </InventoryControlButton>
          <InventoryControlButton onClick={handleToggleView}>
            {isListView ? 'Switch to Card View' : 'Switch to List View'}
          </InventoryControlButton>
        </InventoryControls>
      </InventoryHeader>
      {/* <InventoryBody items={items} view={isListView} itemType={FoodItem}/> */}
    </InventoryWrapper>
  )
}

export default Inventory
