import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Error } from '../models/Error.model';
import firebase from "firebase/compat/app";
import "firebase/compat/database";

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
}
