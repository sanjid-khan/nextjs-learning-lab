import React from 'react'

const DynamicUserIdPage = async({params}) => {

  const {userid} = await params;

  return (
    <div>
     DynamicUserIdPage {userid}
    </div>
  )
}

export default DynamicUserIdPage
