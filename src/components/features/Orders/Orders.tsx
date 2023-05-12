import React from 'react'

type Order = {
  id: number
  customerName: string
  address: string
  items: string[]
  totalPrice: number
  date: Date
}

type Props = {
  orders: Order[]
}

const Orders: React.FC<Props> = ({orders}) => {
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>Order ID: {order.id}</h3>
          <p>Customer Name: {order.customerName}</p>
          <p>Delivery Address: {order.address}</p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>Total Price: {order.totalPrice}</p>
          <p>Order Date: {order.date.toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  )
}

export default Orders
