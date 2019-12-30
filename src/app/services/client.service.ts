import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
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

  constructor(
    private afs: AngularFirestore
  ) {
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  /**
   * Get clients from Firestore panel.
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
   * Add new client to Firestore panel.
   * @param client
   */
  newClient(client: Client) {
    this.clientsCollection.add(client);
  }

  /**
   * Get client by id from Firestore panel.
   * @param id
   */
  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );

    return this.client;
  }

  /**
   * Update client by id in Firestore panel.
   * @param client
   */
  updateClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  /**
   * Delete client by id in Firestore panel.
   * @param client
   */
  deleteClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
