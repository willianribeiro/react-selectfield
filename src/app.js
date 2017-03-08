'use strict'

import React, { Component } from 'react'

import './css/style.css'
import SelectField from 'components/SelectField'

const options = [
  {label: 'Option 1', value: 1},
  {label: 'Option 2', value: 2, isSelected: true},
  {label: 'Option 3', value: 3}
]

class App extends Component {
  render () {
    return (
      <div style={{maxWidth: '300px', margin: '50px auto'}}>
        <SelectField
          source={options}
          className='my-custom-css' />
      </div>
    )
  }
}

export default App
