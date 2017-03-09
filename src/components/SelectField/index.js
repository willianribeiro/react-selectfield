'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import './SelectField.css'

const events = {
  pauseEvent (event) {
    event.stopPropagation()
    event.preventDefault()
  },

  addEventsToDocument (eventMap) {
    Object.keys(eventMap).forEach((key) => {
      document.addEventListener(key, eventMap[key], false)
    })
  },

  removeEventsFromDocument (eventMap) {
    Object.keys(eventMap).forEach((key) => {
      document.removeEventListener(key, eventMap[key], false)
    })
  },

  targetIsDescendant (event, parent) {
    let node = event.target
    while (node !== null) {
      if (node === parent) return true
      node = node.parentNode
    }
    return false
  }
}

class SelectField extends React.Component {
  constructor () {
    super()
    this.state = {
      isOpened: false
    }

    this.toggle = this.toggle.bind(this)
    this.close = this.close.bind(this)
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.getDocumentEvents = this.getDocumentEvents.bind(this)
  }

  toggle () {
    this.setState({isOpened: !this.state.isOpened})
  }

  close () {
    this.setState({isOpened: false})
  }

  setSelected (selected) {
    this.input.value = selected
  }

  handleDocumentClick (event) {
    if (this.state.isOpened && !events.targetIsDescendant(event, ReactDOM.findDOMNode(this))) {
      this.setState({ isOpened: false })
    }
  }

  getDocumentEvents () {
    return {
      click: this.handleDocumentClick,
      touchend: this.handleDocumentClick
    }
  }

  componentWillUpdate (nextProps, nextState) {
    if (!this.state.isOpened && nextState.isOpened) {
      events.addEventsToDocument(this.getDocumentEvents())
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.isOpened && !this.state.isOpened) {
      events.removeEventsFromDocument(this.getDocumentEvents())
    }
  }

  componentWillUnmount () {
    if (this.state.isOpened) {
      events.removeEventsFromDocument(this.getDocumentEvents())
    }
  }

  render () {
    let {
      className,
      source,
      value,
      onChange
    } = this.props

    className = className ? `${className} select-field` : 'select-field'
    className += this.state.isOpened ? ' is-opened' : ''

    return (
      <div className={className}>
        <div
          className='select-field__display'
          onClick={this.toggle}
          tabIndex='-1'
          ref={(display) => { this.display = display }}>
          <div className='select-field__display-placeholder'>
            Selecione uma opção...
          </div>
          <div className='select-field__display-label'>
            Opção selecionada
          </div>
          <div className='select-field__display-input'>
            <input
              readOnly
              type='text'
              value={value}
              onChange={onChange}
              ref={(input) => { this.input = input }}
            />
          </div>
        </div>

        <ul className='select-field__options'>
          {
            source.map(item => {
              let classNameItem
              classNameItem = 'select-field__option'
              classNameItem += item.value === value ? ' is-selected' : ''

              return (
                <li
                  key={item.value}
                  className={classNameItem}>
                  {item.label}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default SelectField
