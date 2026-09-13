"use client"
import React from 'react'
import { useParams,usePathname } from 'next/navigation'

const ShopTagItem = () => {

 const params = useParams();
 const pathname = usePathname();

 console.log(params);

  return (
    <div>ShopTagPage {pathname}</div>
  )
}

export default ShopTagItem