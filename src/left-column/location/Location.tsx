import React from 'react';
import './location.scss';
import '../../font-icons/style.scss';

class Location extends React.Component<LocationProps, {}> {
  constructor(props: LocationProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div id='location'>
      <span className='bryan icon-location'/>
      <span className='location'>{this.props.location}</span>
    </div>);
  }
}

interface LocationProps {
  location: string;
}

export default Location;
