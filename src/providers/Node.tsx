import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { createConnector } from '../functions/index';
import Node from '../components/Node/Node';
import { connect } from 'react-redux';

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
      };

      constructor(props, context) {
        super(props, context);
        console.log('>> node Provider', props);

        this.store = this.context.store;
        this.handlerConnector = createConnector({ store: this.store, collect, props });
        this.state = this.handlerConnector;
      }

      render() {
        return <Node
          {...this.props}
          {...this.state}
        >
          <DecoratedComponent
            {...this.props}
            {...this.state}
          />
        </Node>;
      }

    }
    NodeContainer.DecoratedComponent = DecoratedComponent;
    NodeContainer.displayName =  `Node(${displayName})`;

    return hoistStatics(connect(props => ({
      activeNode: props.activeNode
    }))(NodeContainer), DecoratedComponent);
  };

}
