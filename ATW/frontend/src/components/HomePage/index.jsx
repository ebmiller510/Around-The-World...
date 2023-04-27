import React from 'react'

export default function HomePage({ galleryContent }) {
    return (
      <>
         <div className='gallery flex flex-wrap'>
            {galleryContent}
        </div>

      </>
    )
}
 