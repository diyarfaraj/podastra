import * as firebase from 'firebase';
import 'firebase/functions';
import 'firebase/database';

var firebaseConfig = {
  //Your firebase config here
  apiKey: 'AIzaSyCsgz05LbdUKNkSLmEON9yzuhffej0sdlY',
  authDomain: 'podastra-47a13.firebaseapp.com',
  databaseURL: 'https://podastra-47a13.firebaseio.com',
  projectId: 'podastra-47a13',
  storageBucket: 'podastra-47a13.appspot.com',
  messagingSenderId: '504707347721',
  appId: '1:504707347721:web:6caf64c0668e9c1a940fd8',
  measurementId: 'G-RRBBGJ4L0G',
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase;
