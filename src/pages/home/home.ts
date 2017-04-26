import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {
	GoogleMaps,
	GoogleMap,
	GoogleMapsEvent,
	LatLng,
	MarkerOptions
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	private _map: GoogleMap;
	constructor(
		private navCtrl: NavController,
		private geolocation: Geolocation,
		private googleMaps: GoogleMaps
	) { }

	ionViewWillEnter() {
		this._obtenerPosicion();
	}

	private _obtenerPosicion(): any {
		this.geolocation.getCurrentPosition()
			.then(response => this._loadMap(response))
			.catch(error => console.log(error));
	}

	private _loadMap(postion: Geoposition) {
		let element: HTMLElement = document.getElementById('map');
		this._map = this.googleMaps.create(element);

		let target: LatLng = new LatLng(postion.coords.latitude, postion.coords.longitude);

		this._map.one(GoogleMapsEvent.MAP_READY).then(() => {
			this._moveCamera(target);
			this._addMarker(target);
		});

	}

	private _addMarker(position: LatLng) {
		let markerOptions: MarkerOptions = {
			position,
			title: 'I am Here :D'
		};
		this._map.addMarker(markerOptions);
	}

	private _moveCamera(target) {
		this._map.animateCamera({
			target,
			zoom: 14,
			tilt: 0,
			bearing: 0,
			duration: 1000
		});
	}
}
