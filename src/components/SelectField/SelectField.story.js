'use strict'

import { storiesOf } from '@kadira/storybook'
import React, { Component } from 'react'
import SelectField from './index'

const stories = storiesOf('SelectField', module)

stories.add('without props', () => (
  <SelectField>Main title</SelectField>
))

stories.add('async / await', () => {
  class Main extends Component {
    constructor () {
      super()
      this.state = { title: '...' }
    }

    render () {
      return (
        <SelectField>{this.state.title}</SelectField>
      )
    }
  }

  return <Main />
})
