import React from 'react'
import Spinner from 'react-spinkit'

function MatchesLoader() {
  return (
    <div>
      <Spinner style={{ marginLeft: '15px' }} color='#e1e1e1' name='circle' />
    </div>
  )
}

export default MatchesLoader
