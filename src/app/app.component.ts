import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyBminGPu-zeb7j5z2aZPVlR20ZMUqkWV1s",
      authDomain: "testproj-2089a.firebaseapp.com"
    })
  }


}
