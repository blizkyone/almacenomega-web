import React from 'react'

const PlaceMapIcon = ({ hover, selected }) => {
   const style = selected
      ? {
           color: 'purple',
           fontSize: '2rem',
           transform: 'translate(-50%, -100%)',
        }
      : hover
      ? { color: 'red', fontSize: '2rem', transform: 'translate(-50%, -100%)' }
      : { fontSize: '2rem', transform: 'translate(-50%, -100%)' }

   return (
      <div style={style}>
         <i className='fas fa-map-marker-alt'></i>
      </div>
   )
}

export default PlaceMapIcon
