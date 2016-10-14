// @flow
import React, { PureComponent } from 'react';
import './view.css';
import * as Controller from './controller';
import * as Model from './model';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class Luke extends PureComponent<void, Props, void> {
  handleClick: () => void = () => {
    this.props.dispatch({
      type: 'Load',
    });
  };

  render() {
    return (
      <div className="Luke">
        <button
          disabled={this.props.state.isLoading}
          onClick={this.handleClick}
        >
          {this.props.state.isLoading ? 'Loading' : 'Get Luke\'s full name'}
        </button>
        <p>
          {this.props.state.fullName}
        </p>
      </div>
    );
  }
}
