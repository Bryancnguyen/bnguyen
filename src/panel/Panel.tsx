import React from 'react';
import './panel.scss';

class Panel extends React.Component<PanelProps, {}> {
  constructor(props: PanelProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;
    return (
    <div className='panel'>
      { this.props.title && <h2>{title}</h2> }
      {this.props.children}
    </div>);
  }
}

interface PanelProps {
  title?: string;
}

export default Panel;
