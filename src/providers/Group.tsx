import * as React from 'react';
import Group from '../components/Group/Group';
import hoistStatics from 'hoist-non-react-statics';
import { connect } from 'react-redux';

export default function groupDecorator() {
  return function wrapGroupWithProvider(DecoratedComponent) {
    const displayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Group';

    class GroupContainer extends React.Component<any, any> {
      static DecoratedComponent: Element;
      static displayName: string;

      static childContextTypes = {
        store: React.PropTypes.any,
      };

      getChildContext() {
        return this.context;
      }

      static contextTypes = {
        store: React.PropTypes.any,
      };

      constructor(props, context) {
       super(props, context);
      }

      render() {
        return <Group {...this.props}>
          <DecoratedComponent {...this.props} />
        </Group>
      }
    }

    GroupContainer.DecoratedComponent = DecoratedComponent;
    GroupContainer.displayName = `Group(${displayName})`;

    return hoistStatics(GroupContainer, DecoratedComponent);
  }
}
