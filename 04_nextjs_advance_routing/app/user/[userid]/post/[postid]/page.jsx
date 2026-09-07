import React from 'react'

const DynamicPostIdPage = async({params}) => {

  const {userid,postid} = await params;

  return (
    <div>
       postId : {postid}
       <br></br>
       userId : {userid}
    </div>
  )
}

export default DynamicPostIdPage
