import * as React from 'react';
import * as hoistStatics from 'hoist-non-react-statics';
import { createConnector } from '../functions';
import Node from '../components/Node/Node';
import { connect } from 'react-redux'

type CollectFunction = (collectFunction: any) => {};

export default function nodeDecorator(_collect: CollectFunction = (any) => {}) {
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
      private container: any;

      private context: any;
      static contextTypes = {
        container: Object,
      };

      constructor(props, context) {
        super(props, context);

        this.container = this.context.container;
        this.handlerConnector = createConnector({ container: this.container, collect });
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
