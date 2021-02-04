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
        <Spinner name='three-bounce' color='#bd90d6' />
      </div>
    </div>
  )
}

export default Loader
