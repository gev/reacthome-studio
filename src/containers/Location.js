
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import GoogleMaps from './GoogleMaps';
import { modify } from '../actions';

const Map = withScriptjs(withGoogleMap(props => (
  <GoogleMaps {...props} />
)));

class Container extends Component {
  render() {
    return (
      <Map
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCbdKJ0hZcwWNn-hicxhA0v8iiucs03KZA"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    modify: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
