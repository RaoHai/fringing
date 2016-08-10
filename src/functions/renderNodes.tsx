import * as React from 'react';
import Node from '../components/Node';

export default function renderChildren(child) {
  return child.map( node => <Node data={node} />);
}
