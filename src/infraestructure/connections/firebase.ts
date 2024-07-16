import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import 'dotenv/config';

@Injectable()
export class FirebaseConnection implements OnModuleInit {
  private firebaseApp: admin.app.App;

  onModuleInit() {
    const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
    console.log(serviceAccount);
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  get messaging() {
    return this.firebaseApp.messaging();
  }
}
