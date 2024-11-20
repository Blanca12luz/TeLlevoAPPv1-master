import { User } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _accountData!: User;

  constructor(private _afAuth: AngularFireAuth, private _data: AuthService) {
    this.loadUserFromLocalStorage();
  }

  async register(email: string, password: string, data: User) {
    const r = await this._afAuth.createUserWithEmailAndPassword(email, password);
    if (r.user) {
      this._accountData = data;
      await this._data.addDocumentWithId('users', email, data);
      this.saveUserToLocalStorage();
      return true;
    }
    return false;
  }
  addDocumentWithId(arg0: string, email: string, data: User) {
    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string) {
    try {
      const r = await this._afAuth.signInWithEmailAndPassword(email, password);
      console.log(r.user?.email);
      if (r.user?.email) {
        this._accountData = await this._data.getDocument('users', email) as User;
        this.saveUserToLocalStorage();
        return { status: "success" };
      }
      return { status: "error", error: "unknown" };
    } catch (error: any) {
      if (error.message == 'Firebase: Error (auth/invalid-credential).') {
        return { status: "error", error: "invalid-credential" };
      }
    }
    return { status: "error", error: "unknown" };
  }
  getDocument(arg0: string, email: string): any {
    throw new Error('Method not implemented.');
  }

  async deRegister() {
    this._afAuth.currentUser.then(u => {u?.delete()});
  }

  async logout() {
    await this._afAuth.signOut();
    this.clearUserFromLocalStorage();
  }

  async getUserInstance() {
    return this._accountData;
  }

  async refreshUserData() {
    if (this._accountData.email) {
      this._accountData = await this._data.getDocument('users', this._accountData.email) as User;
      this.saveUserToLocalStorage();
    }
  }

  async isLoggedIn() {
    const loggedIn = await firstValueFrom(this._afAuth.authState);
    return loggedIn?.email ? true : false;
  }

  async getUserData(uid: string) {
    return await this._data.getDocument('users', uid) as User;
  }

  private saveUserToLocalStorage() {
    localStorage.setItem('user', JSON.stringify(this._accountData));
  }

  private loadUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this._accountData = JSON.parse(user);
    }
  }

  private clearUserFromLocalStorage() {
    localStorage.removeItem('user');
  }
}
