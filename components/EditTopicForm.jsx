"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
export default  function EditTopicForm({id, title, description}) {

  const [newTitile, setNewTitle] = React.useState(title)
  const [newDescription, setNewDescription] = React.useState(description)

  const router = useRouter()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`,{
        method: 'PUT',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          newTitile, newDescription
        })
      })
      if(!res.ok){
        throw new Error('Failed to update topic')
      }
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
       <input onChange={(e)=>setNewTitle(e.target.value)}
       value={newTitile}
        className='border border-slate-500 px-8 py-2' type="text" placeholder='Topic Title' /> 
       <input onChange={(e)=>setNewDescription(e.target.value)}
       value={newDescription}
        className='border border-slate-500 px-8 py-2' type="text" placeholder='Topic Description' /> 
       <button className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Update Topic</button>
    </form>
  )
}
