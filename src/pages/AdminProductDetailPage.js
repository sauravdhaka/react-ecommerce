import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetails from '../features/product-list/components/ProductDetails'
import AdminProductDetails from '../features/admin/components/AdminProductDetails'
export default function AdminProductDetailPage() {
  return (
    <Navbar>
        <AdminProductDetails></AdminProductDetails>
    </Navbar>
  )
}
