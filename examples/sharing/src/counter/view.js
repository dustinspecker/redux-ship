// @flow
import React, { PureComponent } from 'react';
import * as Model from './model';

type Props = {
  state: Model.State,
};

export default class Counter extends PureComponent<void, Props, void> {
  render() {
    return (
      <p>{this.props.state}</p>
    );
  }
}
