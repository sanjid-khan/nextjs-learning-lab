"use client"
import React from 'react'
import { useParams,usePathname } from 'next/navigation'

const ShopPage = () => {

 const params = useParams();
 const pathname = usePathname();
 
 console.log(params);

  return (
    <div>ShopPage {pathname}</div>
  )
}

export default ShopPage