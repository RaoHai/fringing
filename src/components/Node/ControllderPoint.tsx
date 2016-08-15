import * as React from 'react';
import * as classnames from 'classnames';


export default function ControllerPoint(props) {
  const { type, className } = props;
  const cls = classnames(className, {
    ['controller-point']: true,
    [type]: true,
  });

  return <span {...props}  className={cls}/>;
}
