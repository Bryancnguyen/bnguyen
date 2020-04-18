import React from 'react';
import './contactInfo.scss';

class ContactInfo extends React.Component<ContactInfoProps, {}> {
  constructor(props: ContactInfoProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div id='contact-info'>
      <div>
        <a className='linkedin' href='https://www.linkedin.com/in/bryancnguyen/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>
      </div>
      <div>
        <a className='github' href='https://github.com/Bryancnguyen' target='_blank' rel='noopener noreferrer'>Github</a>
      </div>
      <div>
        <a className='email' href='mailto:bryan.canh@gmail.com'>{this.props.contactInfo}</a>
      </div>
    </div>);
  }
}

interface ContactInfoProps {
  contactInfo: string;
}

export default ContactInfo;
