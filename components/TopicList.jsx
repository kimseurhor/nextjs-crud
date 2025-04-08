import React from 'react'
import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'


const getTopics = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/topics', {
      next: { revalidate: 10 }, // Revalidate every 10 seconds
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return { topics: [] }; // Return an empty array as a fallback
  }
};

export default async function TopicList() {
  const data = await getTopics();
  const topics = data?.topics || []; // Fallback to an empty array if topics is undefined

  return (
    <>
      {topics.length > 0 ? (
        topics.map((t) => (
          <div
            key={t._id}
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
        ))
      ) : (
        <div>No topics available</div> // Fallback UI
      )}
    </>
  );
}
