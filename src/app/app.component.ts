import { Component } from '@angular/core';
import firebase from "firebase/compat/app"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyD1qd7LRfH_K8WSBs5oeUd6zay0LOzpM4M",
      authDomain: "errorshelves-7be8b.firebaseapp.com",
      projectId: "errorshelves-7be8b",
      storageBucket: "errorshelves-7be8b.appspot.com",
      messagingSenderId: "764681123301",
      appId: "1:764681123301:web:04df77e654b755df9aab0c"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
