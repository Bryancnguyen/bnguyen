import React from 'react';
import './pie.scss';

/**
 * Our little pie will be made up of X numbers of <circles></circles>
 * lets see how that goes..
 */
class Pie extends React.Component<PieProps, PieState> {
  private totalCircumference = 0;
  private clickTimeout: number = 0;
  private timer: number = 0;

  constructor(props: PieProps) {
    super(props);
    this.state = {
      circleElements: [],
      pieHover: false,
      pieClicked: false,
      completed: false,
      percentage: 0,
    };
  }

  public componentDidMount() {
    this.updatePercentage();
  }

  private updatePercentage = () =>{
    const { completed } = this.state;
    if (!completed) {
      this.timer = window.setInterval(this.updatePercentageNumber, 15);
    } else {
      window.clearInterval(this.timer);
    }
  }

  private updatePercentageNumber = () => {
    if (this.state.percentage !== 100) {
      this.setState((prevState) => ({percentage: prevState.percentage + 1}));
    } else {
      this.setState({completed: true});
    }
  }

  private onClick = () => {
    this.setState({pieClicked: true});
    window.clearTimeout(this.clickTimeout);
    this.clickTimeout = window.setTimeout(() => {
      this.setState({pieClicked: false});
    }, 500);
    if (this.props.onClick) this.props.onClick();
  }

  private renderCircleElements() {
    this.totalCircumference = 0;
    const circles = [{
      c: 100,
      viewSize: 40,
      className: 'circle-bg',
      onClick: this.onClick,
    }, {
      c: 110,
      viewSize: 40,
      className: `circle-bg-clicked ${this.state.pieClicked ? 'active': ''}`,
      onClick: this.onClick,
    }, {
      c: 100,
      viewSize: 40,
      className: 'circle',
      percentage: this.calculatePercentage(31),
      color: '#ffdb8d',
    }, {
      c: 100,
      viewSize: 40,
      className: 'circle',
      percentage: this.calculatePercentage(13),
      color: '#0AE6E5',
    }, {
      c: 100,
      viewSize: 40,
      className: 'circle',
      percentage: this.calculatePercentage(15),
      color: '#ffa28d',
    },
    {
      c: 100,
      viewSize: 40,
      className: 'circle',
      percentage: this.calculatePercentage(22),
      color: '#ff8db1',
    }];
    
    return circles.map((c, index) => {
      return this.createProgressCircle(c.c, c.viewSize, c.className, index, c.percentage, c.color, c.onClick);
    });
  }

  private createProgressCircle(circumference: number, viewSize: number, className: string, index: number, completion?: number, strokeColor?: string, onClick?: () => void) {
    const radius = circumference / (2 * Math.PI);
    const diameter = radius * 2;
    const x = viewSize / 2;
    const y = ((viewSize - diameter) / 2);
    const offsetCompletion = this.totalCircumference > 0 ? -this.totalCircumference : this.totalCircumference;
    this.totalCircumference += circumference && completion ? completion : 0;
    if (strokeColor && completion) {
      return (
        <path
          key={`circle-${index}`}
          className={className}
          d={`M${x} ${y} a ${radius} ${radius} 0 0 1 0 ${diameter} a ${radius} ${radius} 0 0 1 0 -${diameter}`}
          stroke={strokeColor}
          onClick={onClick}
          strokeDasharray={`${completion}, 100`}
          strokeDashoffset={offsetCompletion}
        />
      );
    } else {
      return (
        <path
          key={`circle-${index}`}
          onClick={onClick}
          className={className}
          d={`M${x} ${y} a ${radius} ${radius} 0 0 1 0 ${diameter} a ${radius} ${radius} 0 0 1 0 -${diameter}`}
        />
      );
    }
  }

  private calculatePercentage(months: number) {
    const totalMonths = 81;
    const monthPercentage = (months / totalMonths) * 100;

    return monthPercentage;
  }

  private onMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    if (target.classList.contains('circle-bg') || target.classList.contains('percentage') || target.classList.contains('circle-bg-clicked')) {
      this.setState({pieHover: true});
    }
  }

  private onMouseOut = (e: never) => {
    this.setState({pieHover: false});
  }

  render() {
    return (
    <div id='pie' className={this.state.pieHover ? 'pieHover': ''} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
      <svg viewBox="0 0 40 40" className="circular-chart">
      {this.renderCircleElements()}
      <text x="20" y="22" className="percentage" onClick={this.onClick}>{`${this.state.percentage}%`}</text>
    </svg>
    </div>);
  }
}

interface PieState {
  circleElements: JSX.Element[];
  pieHover: boolean;
  pieClicked: boolean;
  completed: boolean;
  percentage: number;
}

interface PieProps {
  onClick?: () => void;
}

/**
 * Pie should be able to take in a set of items each with their own
 * percentage of the pie. 
 */

export default Pie;
