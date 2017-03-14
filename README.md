# SelectField

## DISCLAIMER
React SelectField is still in development, it's not ready to use in production.


![image](https://cloud.githubusercontent.com/assets/3102551/23927387/255ffae6-08f8-11e7-8977-b480e45bfe63.png)



```
import React, { Component } from 'react'

import './css/style.css'
import SelectField from 'components/SelectField'

const options = [
  {label: 'Facebook', value: 'FACEBOOK'},
  {label: 'Twitter', value: 'TWITTER'},
  {label: 'Google', value: 'GOOGLE'},
  {label: 'Instagram', value: 'INSTAGRAM'},
  {label: 'Pinterest', value: 'PINTEREST'},
  {label: 'Tumblr', value: 'TUMBLR'}
]

class App extends Component {
  constructor () {
    super()
    this.state = {
      selected: ''
    }
  }

  handleChange (value) {
    this.setState({selected: value})
  }

  render () {
    return (
      <div style={{maxWidth: '300px', margin: '50px auto'}}>
        <SelectField
          className='my-custom-css'
          placeholder={'Social Networking'}
          value={this.state.selected}
          source={options}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }
}

export default App
```
