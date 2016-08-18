import * as React from 'react';
import { connect } from 'react-redux';

class Group extends React.Component<any, any> {
  render() {
    return <div className="fringing-group">{this.props.children}</div>
  }
}

export default Group;
