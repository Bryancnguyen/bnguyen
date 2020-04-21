import React, { RefObject } from 'react';
import './modal.scss';

class Modal extends React.Component<ModalProps, ModalState> {
  private contentRef: React.Ref<HTMLDivElement> | null = null;

  constructor(props: ModalProps) {
    super(props);
    this.state = {
      iconDownTop: 0,
      scrolled: false,
    };
    this.contentRef = React.createRef();
  }

  private onClose = () => {
    this.props.onClose();
  }

  public componentDidMount() {
    if (this.contentRef) {
      const ref = this.contentRef as RefObject<HTMLDivElement>;
      const currentHeight = ref.current?.clientHeight;
      this.setState({ iconDownTop: currentHeight ? currentHeight - 40 : 0 });
    }
  }

  private onScroll = () => {
    if (this.contentRef) {
      const ref = this.contentRef as RefObject<HTMLDivElement>;
      const scrollTop = ref.current?.scrollTop;
      if (scrollTop && scrollTop > 0) {
        this.setState({ scrolled: true });
      }
      if (scrollTop === 0 && this.state.scrolled) {
        this.setState({ scrolled: false });
      }
    }
  }

  render() {
    const iconDownStyle = {
      top: `${this.state.iconDownTop}px`,
    }
    return (
      <div className='modal'>
        <div className='modal-overlay' onClick={this.onClose} />
        <div className='modal-container' ref={this.contentRef} onScroll={this.onScroll}>
          <span className='bryan icon-close' onClick={this.onClose} />
          <div className='content'>
            {this.props.children}
            {!this.state.scrolled && this.props.showScroll &&
              <span className='bryan icon-down' style={iconDownStyle} />
            }
          </div>
        </div>
      </div>);
  }
}

interface ModalProps {
  onClose: () => void;
  showScroll: boolean;
}

interface ModalState {
  iconDownTop: number;
  scrolled: boolean;
}

export default Modal;
