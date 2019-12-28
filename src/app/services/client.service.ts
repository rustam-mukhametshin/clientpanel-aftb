import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Client} from '../models/Client';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  /**
   * Getting clients from Firestore panel.
   */
  getClients(): Observable<Client[]> {
    // Get clients with the id
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Client;
        data.id = a.payload.doc.id;

        return data;
      }))
    );
    return this.clients;
  }

  /**
   * Adding new client to Firestore panel.
   * @param client
   */
  newClient(client: Client) {
    this.clientsCollection.add(client);
  }
}
