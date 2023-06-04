import React from 'react'
import Delivery from './Delivery'

type DeliveryData = {
  deliveryID: number
  partnerID: number
  orderID: number
  customerID: number
  deliveryAddress: string
  deliveryDateTime: string
  deliveryStatus: string
  trackingInfo: string
  deliveryCost: number
  paymentStatus: string
}

type DeliveryTrackerProps = {
  deliveries: DeliveryData[]
}
const dummyData = [
  {
    deliveryID: 1,
    partnerID: 123,
    orderID: 456,
    customerID: 789,
    deliveryAddress: '123 Main St.',
    deliveryDateTime: '2023-04-10 12:00 PM',
    deliveryStatus: 'in transit',
    trackingInfo: 'Out for delivery',
    deliveryCost: 12.99,
    paymentStatus: 'paid',
  },
  {
    deliveryID: 2,
    partnerID: 456,
    orderID: 789,
    customerID: 123,
    deliveryAddress: '456 Elm St.',
    deliveryDateTime: '2023-04-11 1:00 PM',
    deliveryStatus: 'delivered',
    trackingInfo: 'Delivered',
    deliveryCost: 8.99,
    paymentStatus: 'paid',
  },
]
const DeliveryTracker: React.FC<DeliveryTrackerProps> = () => {
  const deliveries = dummyData
  return (
    <div>
      <h1>Delivery App</h1>
      {deliveries.map((delivery) => (
        <Delivery
          key={delivery.deliveryID}
          deliveryID={delivery.deliveryID}
          partnerID={delivery.partnerID}
          orderID={delivery.orderID}
          customerID={delivery.customerID}
          deliveryAddress={delivery.deliveryAddress}
          deliveryDateTime={delivery.deliveryDateTime}
          deliveryStatus={delivery.deliveryStatus}
          trackingInfo={delivery.trackingInfo}
          deliveryCost={delivery.deliveryCost}
          paymentStatus={delivery.paymentStatus}
        />
      ))}
    </div>
  )
}

export default DeliveryTracker
