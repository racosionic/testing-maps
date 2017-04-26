import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	latitude:number;
	longitude:number;

  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  			  private gMaps: GoogleMaps,
  			  private geolocation: Geolocation) {}

	  ngAfterViewInit() {

			this.loadMap();
	   
	  }

  loadMap(){

  	let element = document.getElementById('map');

  	let options = { timeout: 20000, enableHighAcurrancy:true }

  	//let lat = 19.4471147;
  	//let long = -99.14911029999999;

  	let map :GoogleMap = this.gMaps.create(element, {});

  	//console.log(latitude,longitude);

  this.geolocation.getCurrentPosition(options).then(response => {

  	

  	let latlng = new LatLng(response.coords.latitude, response.coords.longitude);

  	map.one(GoogleMapsEvent.MAP_READY).then(() => {

		  let position: CameraPosition = {

			 		target: latlng,
			 		zoom:10,
			 		tilt:30
			 	}

  		map.moveCamera(position);

	  	let markerOptions: MarkerOptions = {

	  		position: latlng,
	  		title:'Biblioteca'
	  	};

	  	let marker = map.addMarker(markerOptions).then((marker:Marker) =>{

	  		marker.showInfoWindow();

	  	});			

  	})




  })

  	

  	



  }

}
