import React from 'react';
import './pie.scss';
import { pieData } from './pieData';
import { calculatePercentage } from './calculatePercentage';

/**
 * To use Pie, pass in a js object in the structure of PieData
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
    // call to update the percentage and start strokes
    this.updatePercentage();
  }

  public componentWillUnmount() {
    // mem leaks are bad
    window.clearInterval(this.timer);
    window.clearTimeout(this.clickTimeout);
  }

  /**
   * Function that updates the percentage inside the circle
   */
  private updatePercentage = () =>{
    const { completed } = this.state;
    if (!completed) {
      this.timer = window.setInterval(this.updatePercentageNumber, 15);
    }
  }

  /**
   * Doing this so I don't have to do .bind on it or else it could just go in setInterval
   */
  private updatePercentageNumber = () => {
    if (this.state.percentage !== 100 && !this.state.completed) {
      this.setState((prevState) => ({percentage: prevState.percentage + 1}));
    } else {
      this.setState({completed: true});
      window.clearInterval(this.timer);
    }
  }

  /**
   * Shadow around the pie when you click on the pie
   */
  private onClick = () => {
    this.setState({pieClicked: true});
    window.clearTimeout(this.clickTimeout);
    this.clickTimeout = window.setTimeout(() => {
      this.setState({pieClicked: false});
    }, 500);
    if (this.props.onClick) this.props.onClick();
  }

  /**
   * Renders each circle element from the js data
   */
  private renderCircleElements() {
    this.totalCircumference = 0;
    const circles = pieData;
    
    return circles.map((c, index) => {
      return this.createProgressCircle(index, c.completion, c.color);
    });
  }

  /**
   * Calculates the individual strokes that show up around the pie chart
   * @param index 
   * @param completion 
   * @param strokeColor 
   */
  private createProgressCircle(index: number, completion: number, strokeColor: string) {
    const { x, y, radius, diameter } = this.calculateDPath();
    const completedAmount = calculatePercentage(completion, this.props.total);
    const offsetCompletion = this.totalCircumference > 0 ? -this.totalCircumference : this.totalCircumference;
    this.totalCircumference += this.props.circumference && completedAmount ? completedAmount : 0;
    return (
      <path
        key={`circle-${index}`}
        className={'circle'}
        d={`M${x} ${y} a ${radius} ${radius} 0 0 1 0 ${diameter} a ${radius} ${radius} 0 0 1 0 -${diameter}`}
        stroke={strokeColor}
        strokeDasharray={`${completedAmount}, 100`}
        strokeDashoffset={offsetCompletion}
      />
    );
  }

  /**
   * function to get x and y position + the size of the circle for the svg path
   * @param c if a circumference is passed, calculate with it
   */
  private calculateDPath(c?: number) {
    const { circumference, viewSize } = this.props;
    const radius = (c ? c : circumference) / (2 * Math.PI);
    const diameter = radius * 2;
    const x = viewSize / 2;
    const y = ((viewSize - diameter) / 2);
    return {
      radius,
      diameter,
      x,
      y
    }
  }

  /**
   * Show a hover text if user has entered this element
   */
  private onMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    if (target.classList.contains('circle-bg') || target.classList.contains('percentage') || target.classList.contains('circle-bg-clicked')) {
      this.setState({pieHover: true});
    }
  }

  /**
   * Remove hover css class on hover out
   */
  private onMouseOut = (_: never) => {
    this.setState({pieHover: false});
  }

  render() {
    const bgSize = this.calculateDPath();
    const clickShadowSize = this.props.clickedSize ? this.props.clickedSize : 10;
    const bgClicked = this.calculateDPath(this.props.circumference + clickShadowSize);
    return (
    <div id='pie' className={this.state.pieHover ? 'pieHover': ''} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
      <svg viewBox="0 0 40 40" className="circular-chart">
      <path
          className='circle-bg'
          onClick={this.onClick}
          d={`M${bgSize.x} ${bgSize.y} a ${bgSize.radius} ${bgSize.radius} 0 0 1 0 ${bgSize.diameter} 
          a ${bgSize.radius} ${bgSize.radius} 0 0 1 0 -${bgSize.diameter}`}
      />
      <path
        className={`circle-bg-clicked ${this.state.pieClicked ? 'active': ''}`}
        onClick={this.onClick}
        d={`M${bgClicked.x} ${bgClicked.y} a ${bgClicked.radius} ${bgClicked.radius} 0 0 1 0 ${bgClicked.diameter} a ${bgClicked.radius} ${bgClicked.radius} 0 0 1 0 -${bgClicked.diameter}`}
      />
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
  viewSize: number;
  circumference: number;
  clickedSize?: number // the size of the shadow that shows up click clicking the pie
  total: number; // the total of each stroke's completion percentage added together
}

export default Pie;
