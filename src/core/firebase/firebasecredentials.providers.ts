import * as FIREBASE_CREDENTIALS from '../../core/constants/firebase';
import { FirebaseCredentials } from './dto/firebasecredentials.dto';

export const firebaseCredentialsProviders = [
  {
    provides: [FIREBASE_CREDENTIALS],
    useValue: FirebaseCredentials,
  },
];
