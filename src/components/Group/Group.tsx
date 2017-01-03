import * as React from 'react';
import { Map } from 'immutable';

export interface GroupProps {
  nodes: Map<string, any>;
}

class Group extends React.Component<GroupProps, any> {
  render() {
    return <div className="fringing-group" >{this.props.children}</div>;
  }
}

export default Group;
