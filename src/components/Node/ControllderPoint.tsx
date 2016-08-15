import * as React from 'react';
import * as classnames from 'classnames';

export default class ControllerPoint extends React.Component<any, any> {
  render() {
    const { type } = this.props;
    console.log('>> type', type);
    const cls = classnames({
      ['controller-point']: true,
      [type]: true
    });

    return <span className={cls} />;
  }
}
