import React from 'react'
import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'


const getTopics = async()=>{
  try {
    const res = await fetch('http://localhost:3000/api/topics', {
      cache: 'no-store',
    })

    if(!res.ok){
      throw new Error('Failed to fetch data')
    }
    return res.json();

  } catch (error) {
    console.log(error)
  }
}

export default async function TopicList() {
  const { topics } = await getTopics()

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id} // Moved the key prop here
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}
