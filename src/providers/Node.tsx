import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { createConnector, Connection, Node } from '../functions/index';
import NodeComponent from '../components/Node/Node';
import { connect } from 'react-redux';

import { ADD_NODE_TO_GROUP } from '../actions/index';
export type CollectFunction = (collectFunction: any) => void;

export default function nodeDecorator(_collect: CollectFunction = (any: any) => {} ) {
  // if direct NodeProvider(node)(Element) to bind data...
  let collect;
  if (typeof _collect === 'object') {
    collect = () => ({ getNodeData: () => _collect });
  } else {
    collect = _collect;
  }

  return function wrapNodeWithProvider(DecoratedComponent) {
    const displayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Node';

    class NodeContainer extends React.Component<any, any> {
      static DecoratedComponent: Element;
      static displayName: string;

      private handlerConnector: Object;
      private store: any;

      private context: any;
      static contextTypes = {
        store: React.PropTypes.any,
        connections: React.PropTypes.array,
        onConnectionsChange: React.PropTypes.func,
        onActiveNodesChange: React.PropTypes.func,
        offset: React.PropTypes.object,
        groupId: React.PropTypes.any,
      };

      constructor(props, context) {
        super(props, context);

        this.store = this.context.store;
        this.handlerConnector = createConnector({ store: this.store, collect, props });
        this.state = this.handlerConnector;

        if (context.groupId) {
          props.dispatch({
            type: ADD_NODE_TO_GROUP,
            payload: {
              groupId: context.groupId,
              node: collect().getNodeData(props),
            }
          });
        }
      }

      handleConnect(source, target) {
        if (!this.props.onConnect || !this.props.onConnect(source, target)) {
          const { connections, onConnectionsChange } = this.context;
          // ! update problems
          const connection = new Connection({
            from: {
              id: source.id,
              point: Node.valueMap[source.activeControllerId],
            },
            to: {
              id: target.id,
              point: Node.valueMap[target.activeControllerId],
            }
          });
          if (!Connection.connectionExisted(connections, connection)) {
            onConnectionsChange(
              connections,
              connections.concat(connection)
            );
          }
        }
      }
      handleActive(node) {
        if (!this.props.onActive || !this.props.onActive(node)) {
          this.context.onActiveNodesChange([
            node
          ]);
        }
      }

      render() {
        const { offset } = this.context;
        return <NodeComponent
          {...this.props}
          {...this.state}
          onConnect={this.handleConnect.bind(this)}
          onActive={this.handleActive.bind(this)}
          style={offset ? {transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)`} : {}}
        >
          <DecoratedComponent
            {...this.props}
            {...this.state}
          />
        </NodeComponent>;
      }

    }
    NodeContainer.DecoratedComponent = DecoratedComponent;
    NodeContainer.displayName =  `Node(${displayName})`;

    return hoistStatics(connect(props => ({
      activeNode: props.activeNode
    }))(NodeContainer), DecoratedComponent);
  };

}
