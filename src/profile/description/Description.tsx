import React from 'react';

class Description extends React.Component<DescriptionProps, {}> {
  constructor(props: DescriptionProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div id='description'>
      <p>{this.props.description}</p>
    </div>);
  }
}

interface DescriptionProps {
  description: string;
}

export default Description;
