'use strict'

import React from 'react'

import './SelectField.css'

class SelectField extends React.Component {
  constructor () {
    super()
    this.state = {
      isOpened: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({isOpened: !this.state.isOpened})
  }

  render () {
    let {className, source} = this.props

    className = className ? `${className} select-field` : 'select-field'
    className += this.state.isOpened ? ' is-opened' : ''

    return (
      <div className={className}>
        <div
          className='select-field__display'
          onClick={this.toggle}
          onBlur={this.toggle}>
          <div className='select-field__display-placeholder'>
            Selecione uma opção...
          </div>
          <div className='select-field__display-label'>
            Opção selecionada
          </div>
          <div className='select-field__display-input'>
            <input type='text' readOnly />
          </div>
        </div>

        <ul className='select-field__options'>
          {
            source.map(item => {
              let classNameItem
              classNameItem = 'select-field__option'
              classNameItem += item.isSelected ? ' is-selected' : ''

              return (
                <li
                  key={item.value}
                  value={item.value}
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
