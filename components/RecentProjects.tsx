import { projects } from '@/data'
import { div } from 'framer-motion/client'
import React from 'react'

const RecentProjects = () => {
  return (
    <>
    <div className='py-20'>
        <h1 className='heading'>A small section of</h1>
        <span className='text-purple'>recent projects</span>
        <div className='flex flex-wrap items-center justify-center p-4 gap-16 mt-10'>
            {projects.map(({title,des,img,iconLists,id,link}) => (
                <div key={id}>
                    {title}
                </div>
            ))}

        </div>
    </div>
    </>
  )
}

export default RecentProjects