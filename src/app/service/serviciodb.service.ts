import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class ServiciodbService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) { 

    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public guardar(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async leer(key:string){
    return await this._storage?.get(key);
}

  public async eliminar(key:string){
    await this._storage?.remove(key);
  }

}