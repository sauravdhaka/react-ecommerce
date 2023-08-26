import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product-list/components/ProductList'
import AdminProductList from '../features/admin/components/AdminProductList'

export default function Home() {
  return (
    <div>
        <Navbar>
            <AdminProductList></AdminProductList>
        </Navbar>
    </div>
  )
}
