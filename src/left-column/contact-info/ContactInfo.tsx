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
    </div>);
  }
}

interface ContactInfoProps {
  contactInfo: string;
}

export default ContactInfo;
