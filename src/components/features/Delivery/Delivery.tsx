import React from 'react'

type DeliveryProps = {
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

const Delivery: React.FC<DeliveryProps> = ({
  deliveryID,
  partnerID,
  orderID,
  customerID,
  deliveryAddress,
  deliveryDateTime,
  deliveryStatus,
  trackingInfo,
  deliveryCost,
  paymentStatus,
}) => {
  return (
    <div>
      <h2>Delivery Information</h2>
      <ul>
        <li>Delivery ID: {deliveryID}</li>
        <li>Delivery Partner ID: {partnerID}</li>
        <li>Order ID: {orderID}</li>
        <li>Customer ID: {customerID}</li>
        <li>Delivery Address: {deliveryAddress}</li>
        <li>Delivery Date and Time: {deliveryDateTime}</li>
        <li>Delivery Status: {deliveryStatus}</li>
        <li>Tracking Information: {trackingInfo}</li>
        <li>Delivery Cost: {deliveryCost}</li>
        <li>Payment Status: {paymentStatus}</li>
      </ul>
    </div>
  )
}

export default Delivery
