
import React, { Component } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';

type Props = {
  zoom: ?number;
  location: ?{};
  modify: (payload: {}) => void;
}

export default class extends Component<Props> {
  state = {};

  componentWillMount() {
    const { zoom = 11, location = { lat: 59.95, lng: 30.33 } } = this.props;
    this.setState({ zoom, location });
  }

  setLocation = ({ latLng }) => {
    this.props.modify({ location: { lat: latLng.lat(), lng: latLng.lng() } });
  }

  setZoom = () => {
    this.props.modify({ zoom: this.map.getZoom() });
  }

  render() {
    const { zoom, location } = this.state;
    return (
      <GoogleMap
        ref={map => { this.map = map; }}
        defaultZoom={zoom}
        defaultCenter={location}
        onZoomChanged={this.setZoom}
        onClick={this.setLocation}
      >
        {
          this.props.location && (
            <Marker position={this.props.location} />
          )
        }
      </GoogleMap>
    );
  }
}
