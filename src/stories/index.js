import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SelectField from '../components/SelectField';

class SelectFieldWrapper extends React.Component {
  constructor () {
    super()
    this.state = {
      selected: '',
    }
  }

  handleChange (value) {
    this.setState({ selected: value })
  }

  render () {
    const source = [
      {label: 'Facebook', value: 'FACEBOOK'},
      {label: 'Twitter', value: 'TWITTER'},
      {label: 'Google', value: 'GOOGLE'},
      {label: 'Instagram', value: 'INSTAGRAM'},
      {label: 'Pinterest', value: 'PINTEREST'},
      {label: 'Tumblr', value: 'TUMBLR'},
    ];

    return (
      <div style={{maxWidth: '300px', margin: '50px auto'}}>
        <SelectField
          className='my-custom-css'
          placeholder={'Social Networking'}
          value={this.state.selected}
          source={source}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }
}

storiesOf('SelectField', module)
  .add('default view', () => (
      <SelectFieldWrapper />
  ));
