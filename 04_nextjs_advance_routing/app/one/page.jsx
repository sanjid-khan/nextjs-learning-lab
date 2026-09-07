import Link from 'next/link'
import React from 'react'

const OnePage = () => {
  return (
    <>
      <Link href={"/one/two"}>Redirect to two page</Link>
      <Link href={"/three"}>Redirect to three page</Link>
    </>
  )
}

export default OnePage