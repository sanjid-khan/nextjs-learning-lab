import React from 'react'


export async function generateMetadata({params}){
    const {userid} = await params;

    return{
        title: `User ${userid}`,
        description: `Profile page for user ${userid}`
    }
}


const UserIdPage = async({params}) => {

  const {userid} = await params;

  return (
    <div>UserIdPage {userid} </div>
  )
}

export default UserIdPage