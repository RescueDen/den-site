import React from 'react';

import { Map, Marker } from "pigeon-maps"
import {Segment} from "semantic-ui-react";

interface IncomingProps {
    locations: Location[];
    selected?: number;
    select?: (id: number) => any;
}

export interface Location {
    latitude: number;
    longitude: number;
    id: number;
}

class ColonyMap extends React.Component<IncomingProps> {
    osmProvider: any = (x: any, y: any, z: any) => {
        const s = String.fromCharCode(97 + (x + y + z) % 3)
        return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
    }

    // @ts-ignore
    handleMarkerClick = ({payload}) => {
        if (this.props.select) {
            this.props.select(payload)
        }
    }

    render() {
        let centerLat = 0;
        let centerLon = 0;

        if (this.props.selected === undefined) {
            centerLat = this.props.locations.map(loc => loc.latitude).reduce((a, b) => a + b, 0);
            centerLon = this.props.locations.map(loc => loc.longitude).reduce((a, b) => a + b, 0);
            centerLat /= this.props.locations.length;
            centerLon /= this.props.locations.length;
        } else {
            const selectedLocation = this.props.locations.find(loc => loc.id === this.props.selected);
            if (selectedLocation) {
                centerLat = selectedLocation.latitude;
                centerLon = selectedLocation.longitude;
            }
        }

        return (<Segment>
                <Map
                    provider={this.osmProvider}
                    center={[centerLat, centerLon]}
                    zoom={12}
                    height={400}>
                    {this.props.locations.map(location => (
                        <Marker anchor={[location.latitude, location.longitude]} payload={location.id}
                                onClick={this.handleMarkerClick}/>))}
                </Map>
            </Segment>)
    }
}

export default ColonyMap;