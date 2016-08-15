import * as React from 'react';
import { connect } from 'react-redux';
import { Group, Shape } from 'react-art';
import { getControllerPosition, getPath } from '../../functions';

export interface TempLinkProps {
  addEventListener: Function;
  dispatch: any;
  activeNode: any;
}

class TempLink extends React.Component<TempLinkProps, any> {
  constructor() {
    super();
    this.state = {
      drawing: false,
      startPosition: null,
      endPosition: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { activeNode } = nextProps;
    if ( activeNode && activeNode.id && activeNode.activeControllerId) {
      this.setState({
        drawing: true,
        startPosition: getControllerPosition(activeNode),
      }, this.enableEventListeners);
    }
  }

  enableEventListeners() {
    // this.props.addEventListener('mousemove', this.mouseMove);
    this.props.dispatch({
      type: 'ADD_EVENT_LISTENER',
      eventName: 'mousemove',
      eventHandler: this.mouseMove,
    });
  }
  mouseMove = (ev) => {
    this.setState({
      endPosition: {
        x: ev.offsetX,
        y: ev.offsetY,
      }
    });
    return true;
  }
  render() {
    const { activeNode } = this.props;
    const { startPosition, endPosition } = this.state;
    if ( !activeNode || !activeNode.id || !activeNode.activeControllerId) {
      return <Group/>;
    }
    if (startPosition && endPosition) {
      const path = getPath(startPosition, endPosition);
      return <Group>
        <Shape d={path} stroke="#d9d9d9" strokeWidth={1} />
      </Group>;
    }
    return <Group />;
  }
}

export default connect(props => ({
  activeNode: props.activeNode,
}))(TempLink);
