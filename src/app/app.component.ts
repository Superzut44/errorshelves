import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyB6jo62IcUsqIrGLfLlj3HCWqNeuRMnTd8",
      authDomain: "errorshelves.firebaseapp.com",
      projectId: "errorshelves",
      storageBucket: "errorshelves.appspot.com",
      messagingSenderId: "740667656459",
      appId: "1:740667656459:web:ba9b29258b115f7644fa0e",
      measurementId: "G-DBGTKH501C"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
