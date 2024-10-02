import { Search } from 'lucide-react'
import React from 'react'

function SearchSection({onSearchInput}:any) {
  return (
    <div className='p-8 bg-gradient-to-br from-teal-400 via-cyan-500 to-indigo-600
flex justify-center items-center flex-col text-white
'>
        <h2 className='text-3xl font-bold'>Browse All Templates</h2>
         <p>What would you like to create today?</p>
         <div className='w-full flex justify-center'>
            <div className='flex gap-2 items-center
            p-2 border rounded-md bg-white my-5 w-[50%]'>

            <Search className='text-primary' />
            <input type='text' placeholder='Seacrh'
            onChange={(event)=>onSearchInput(event.target.value)}
            className='bg-transparent text-black w-full outline-none'/>
            </div>
         </div>
    </div>
  )
}

export default SearchSection


