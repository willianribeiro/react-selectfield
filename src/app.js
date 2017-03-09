'use strict'

import React, { Component } from 'react'

import './css/style.css'
import SelectField from 'components/SelectField'

const options = [
  {label: 'Option 1', value: 1},
  {label: 'Option 2', value: 2},
  {label: 'Option 3', value: 3}
]

class App extends Component {
  constructor () {
    super()
    this.state = {
      selected: ''
    }
  }

  handleChange (event) {
    this.setState({selected: event.target.value})
  }

  render () {
    return (
      <div style={{maxWidth: '300px', margin: '50px auto'}}>
        <SelectField
          className='my-custom-css'
          value={this.state.selected}
          source={options}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }
}

export default App
