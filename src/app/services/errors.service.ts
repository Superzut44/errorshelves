import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Error } from '../models/Error.model';
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import 'firebase/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  errors: Error[] = [];
  errorsSubject = new Subject<Error[]>();

  constructor() { }

  emitErrors() {
    this.errorsSubject.next(this.errors);
  }

  saveErrors() {
    firebase.database().ref('/errors').set(this.errors);
  }

  getErrors() {
    firebase.database().ref('/errors')
    .on('value', (data) => {
      this.errors = data.val() ? data.val() : [];
      this.emitErrors();
    })
  }

  getSingleError(id: number): Promise<Error> {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/errors/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewError(newError: Error) {
    this.errors.push(newError);
    this.saveErrors();
    this.emitErrors();
  }

  removeError(error: Error) {
    if(error.photo) {
      const storageRef = firebase.storage().refFromURL(error.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée !');
        }
      )
      .catch(
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const errorIndexToRemove = this.errors.findIndex(
      (errorEl) => {
        if(errorEl === error) {
          return true;
        }
        return false;
      }
    );
    this.errors.splice(errorIndexToRemove, 1);
    this.saveErrors();
    this.emitErrors();
  }

  uploadFile(file: File): PromiseLike<string> {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
