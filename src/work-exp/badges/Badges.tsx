import React from 'react';
import './badges.scss';

class Badges extends React.Component<BadgesProps, {}> {
  constructor(props: BadgesProps) {
    super(props);
    this.state = {};
  }

  private renderBadges() {
    return this.props.badges.map((badge, idx) => {
      return (
      <span key={`badge-${idx}`} className='badge'>
        {badge}
      </span>)
    });
  }

  render() {
    return (
    <div className='badges'>
      { this.renderBadges() }
    </div>);
  }
}

interface BadgesProps {
  badges: string[];
}

export default Badges;
