import React from 'react'
import Link from 'next/link'
const TwoPage = () => {
  return (
    <div>
      <Link href={"/four"}>Go to Four</Link> 
      <Link href={"/final"}>Go to Final</Link>
    </div>
  )
}

export default TwoPage