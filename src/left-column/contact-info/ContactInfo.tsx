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
      <a className='email' href='mailto:bryancanhnguyen@gmail.com'>{this.props.contactInfo}</a>
      <a className='linkedin' href='https://www.linkedin.com/in/bryancnguyen/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>
    </div>);
  }
}

interface ContactInfoProps {
  contactInfo: string;
}

export default ContactInfo;
