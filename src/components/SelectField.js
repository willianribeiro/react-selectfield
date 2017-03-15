'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

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
      isOpened: false,
      selected: ''
    }

    this.toggle = this.toggle.bind(this)
    this.close = this.close.bind(this)
    this.clear = this.clear.bind(this)
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.getDocumentEvents = this.getDocumentEvents.bind(this)
    this.getLabel = this.getLabel.bind(this)
  }

  toggle () {
    this.setState({isOpened: !this.state.isOpened})
  }

  close () {
    this.setState({isOpened: false})
  }

  clear () {
    this.setState(
      {selected: ''},
      this.handleOptionSelected.bind(this, '')
    )
  }

  handleOptionClick (item) {
    this.setState(
      {selected: item},
      this.handleOptionSelected.bind(this, item.value)
    )
  }

  handleOptionSelected (value) {
    this.props.onChange(value)
    this.close()
  }

  getLabel () {
    if (this.state.selected) {
      return this.state.selected.label
    }
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
      placeholder
    } = this.props

    className = className ? `${className} select-field` : 'select-field'
    className += this.state.isOpened ? ' is-opened' : ''
    className += this.state.selected ? ' is-selected' : ''

    const caretDown = (
      <svg
        className='select-field__display-caret'
        fill='#383838'
        height='24'
        viewBox='0 0 24 24'
        width='24'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z' />
        <path d='M0-.75h24v24H0z' fill='none' />
      </svg>
    )

    const clearButton = (
      <svg
        className='select-field__display-clear'
        onClick={this.clear}
        fill='#383838'
        height='18'
        viewBox='0 0 24 24'
        width='18'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 0h24v24H0z' fill='none' />
        <path d='M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' />
      </svg>
    )

    return (
      <div className={className}>
        <div
          className='select-field__display'
          onClick={this.toggle}
          tabIndex='-1'
          ref={(display) => { this.display = display }}>
          <div className='select-field__display-placeholder'>
            {placeholder}
          </div>
          <div className='select-field__display-label'>
            {this.getLabel()}
          </div>
          <div className='select-field__display-input'>
            <input
              readOnly
              type='text'
              value={this.state.selected}
              ref={(input) => { this.input = input }}
            />
          </div>
          {!this.state.selected && caretDown}
          {this.state.selected && clearButton}
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
                  className={classNameItem}
                  onClick={this.handleOptionClick.bind(this, item)}>
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
