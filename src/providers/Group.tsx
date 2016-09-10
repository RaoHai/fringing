import * as React from 'react';
import Group from '../components/Group/Group';
import * as hoistStatics from 'hoist-non-react-statics';
import { createStore, combineReducers } from 'redux';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { ComponentClass } from 'react';

export interface GroupConfig {
  id?: string;
  position?: {
    x: number;
    y: number,
  };
}

const defaultGroupConfig = {

};

const getGroupId = (function () {
  let count = 0;
  return function () {
    count++;
    return `group_auto_${count}`;
  };
})();

export interface GroupProps {
  groups: Map<string, any>;
}

export default function groupDecorator(groupConfig: GroupConfig = defaultGroupConfig) {

  return function wrapGroupWithProvider(DecoratedComponent) {
    const displayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Group';

    const groupId = groupConfig.id || getGroupId();
    class GroupContainer extends React.Component<GroupProps, any> {
      context:any;
      static DecoratedComponent: Element;
      static displayName: string;

      static childContextTypes = {
        store: React.PropTypes.any,
        offset: React.PropTypes.object,
        groupId: React.PropTypes.any,
      };

      getChildContext() {
        return {
          store: this.context.store,
          offset: groupConfig.position,
          groupId,
        };
      }

      static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.any,
      };

      constructor(props, context) {
        super(props, context);
        this.state = {
          children: [],
        };
      }

      render() {
        const { position } = groupConfig;
        return (<div className="group-wrapper" style={{left: position.x, top: position.y}}>
          <Group nodes={this.props.groups.get(groupId)}>
            <DecoratedComponent {...this.props} />
          </Group>
        </div>);
      }
    }

    GroupContainer.DecoratedComponent = DecoratedComponent;
    GroupContainer.displayName = `Group(${displayName})`;

    return hoistStatics(connect(props => props)(GroupContainer as any), DecoratedComponent);
  };
}
