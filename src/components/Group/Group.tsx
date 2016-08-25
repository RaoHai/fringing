import * as React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

export interface GroupProps {
  nodes: Map;
}

class Group extends React.Component<GroupProps, any> {
  render() {
    console.log('...', this.props.nodes);
    return <div className="fringing-group" >{this.props.children}</div>;
  }
}

export default Group;
