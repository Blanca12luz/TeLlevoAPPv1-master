import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Firestore, addDoc, setDoc, collectionData, docData, updateDoc } from '@angular/fire/firestore';
import { collection, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private _firebase: Firestore) { }

  getCollection(name: string) {
    const collectionRef = collection(this._firebase, name);
    return firstValueFrom(collectionData(collectionRef));
  }

  getDocument(name: string, id: string) {
    const docRef = doc(this._firebase, `${name}/${id}`);
    return firstValueFrom(docData(docRef));
  }

  async addDocumentWithId(name: string, id: string, data: any) {
    const collRef = collection(this._firebase, name);
    const docRef = doc(collRef, id);
    return await setDoc(docRef, data)
  }

  async addDocument(name: string, data: any) {
    const collectionRef = collection(this._firebase, name);
    return await addDoc(collectionRef, data);
  }

  async updateDocument(name: string, id: string, data: any) {
    const docRef = doc(this._firebase, `${name}/${id}`);
    return await updateDoc(docRef, data);
  }
}


