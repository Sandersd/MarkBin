import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins.js';
import { Link } from 'react-router';

class BinsList extends Component {
  onBinRemove(id) {
    Meteor.call("bins.remove", id);
  }

  renderList() {
    return this.props.bins.map(bin => {
      const url = `/bins/${bin._id}`;

      return (
        <li className="list-group-item" key={bin._id}>
          <Link to={url}> Bin {bin._id}</Link>
          <span className="pull-right">
            <button
              className="btn btn-danger"
              onClick={() => this.onBinRemove(bin._id)}>
              Remove
            </button>
          </span>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="list-group">
        {this.renderList()}
      </ul>
    );
  };
}

export default createContainer(() => {
  Meteor.subscribe('bins');
  Meteor.subscribe('sharedBins');

  return { bins: Bins.find({}).fetch() };
}, BinsList);
