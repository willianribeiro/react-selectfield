'use strict'

import React from 'react'

import './SelectField.css'

class SelectField extends React.Component {
  render () {
    return (
      <div className='select-field'>
        <div className='select-field__input'>
          <div className='select-field__input__label'>
            Selecione uma opção
          </div>
        </div>

        <div className='select-field__menu'>
        </div>
      </div>
    )
  }
}

export default SelectField
