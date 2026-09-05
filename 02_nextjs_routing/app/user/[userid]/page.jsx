import React from 'react'

const UserIdPage = async ({params}) => {

  const {userid} = await params;

  return (
    <div>
      UserIdpage  {userid}
    </div>
  )
}

export default UserIdPage
