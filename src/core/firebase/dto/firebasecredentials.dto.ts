import { IFirebaseCredentials } from '../interfaces/firebaseCredentials.interface';

export class FirebaseCredentials implements IFirebaseCredentials {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
