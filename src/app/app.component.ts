import { Component } from '@angular/core';
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAPUm3qyvpKX4gsuYrks1Fii8uzBAG5ZMM",
      authDomain: "errorshelves-e5108.firebaseapp.com",
      databaseURL: "https://errorshelves-e5108-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "errorshelves-e5108",
      storageBucket: "errorshelves-e5108.appspot.com",
      messagingSenderId: "824566667753",
      appId: "1:824566667753:web:a95c98aa909d55069d5378",
      measurementId: "G-8XJSY4J69B"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

  }
}
