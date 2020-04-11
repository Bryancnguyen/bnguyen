import React from 'react';
import './name.scss';

class Name extends React.Component<NameProps, {}> {
  constructor(props: NameProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div id='name'>
      <span>{this.props.name}</span>
    </div>);
  }
}

interface NameProps {
  name: string;
}

export default Name;
