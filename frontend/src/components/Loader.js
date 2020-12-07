import React from 'react'

var Spinner = require('react-spinkit')

function Loader() {
  return (
    <div
      style={{
        height: '35vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <Spinner name='three-bounce' color='#fff' />
      </div>
    </div>
  )
}

export default Loader
