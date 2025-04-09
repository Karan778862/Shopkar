import AddProduct from '@/pages/admin/AddProduct'
import AdminLayout from '@/pages/admin/AdminLayout'
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage'
import AdminUserPage from '@/pages/admin/AdminUserPage'
import DashboardHome from '@/pages/admin/DashboardHome'
import EditProduct from '@/pages/admin/EditProduct'
import ProductList from '@/pages/admin/ProductList'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
         <Route path='/' element={<AdminLayout/>} >
         <Route index element={<DashboardHome/>} />
         <Route path="users" element={<AdminUserPage/>} />
         <Route path="products" element={<ProductList/>} />
         <Route path="products/add" element={<AddProduct/>} />
         <Route path="products/edit/:id" element={<EditProduct/>} />
         <Route path="orders" element={<AdminOrdersPage/>} />
         </Route>
      </Routes>
    </div>
  )
}

export default AdminRoutes
