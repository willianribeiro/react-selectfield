'use strict'

import React from 'react'

import './SelectField.css'

class SelectField extends React.Component {
  render () {
    return (
      <div className='select-field'>
        <div className='select-field__input'>
          <div className='select-field__input-label'>
            Selecione uma opção...
          </div>
          <div className='select-field__input-field'>
            <input type='text' />
          </div>
        </div>

        <ul className='select-field__menu'>
          <li className='select-field__menu-item'>Item 1</li>
          <li className='select-field__menu-item'>Item 2</li>
          <li className='select-field__menu-item'>Item 3</li>
        </ul>
      </div>
    )
  }
}

export default SelectField
