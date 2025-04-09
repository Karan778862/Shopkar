
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CartPage from '@/pages/user/CartPage'
import ShippingAddressForm from '@/pages/user/ShippingAddressForm'
import PaymentPage from '@/pages/user/PaymentPage'
import ConfirmPaymentPage from '@/pages/user/Confirmation'
import UserOrdersPage from '@/pages/user/UserOrdersPage'

const UserRoutes = () => {
  return (
   <Routes>
      <Route path='/cart' element={<CartPage/>}/> 
      <Route path='/shipping' element={<ShippingAddressForm/>}/>
      <Route path='/payment' element={<PaymentPage/>}/>
      <Route path='/order-confirmation/:id' element={<ConfirmPaymentPage/>}/>
      <Route path='/order' element={<UserOrdersPage/>}/>
     

   </Routes>
  )
}

export default UserRoutes;
