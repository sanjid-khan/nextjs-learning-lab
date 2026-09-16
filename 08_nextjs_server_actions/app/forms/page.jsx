import React from 'react'
import { submitUser } from '@/actions/actions'

const FormPage = () => {
  return (
    <div>
      <h1>Create user</h1>    
      <form action={submitUser}>
        <input type='text' name='name' placeholder='Enter Name' />
        <input type='email' name='email' placeholder='Enter Email' />

        <button type='submit'>Submit</button>
      </form>


      <h1>Search Form</h1>
      <form action={"/search"}>
         <input 
           type='text'
           name='query'
           placeholder='Search post id'
         />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default FormPage