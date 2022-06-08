import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Error } from '../models/Error.model';
import { ErrorsService } from '../services/errors.service';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss']
})
export class ErrorListComponent implements OnInit, OnDestroy {

  errors!: Error[];
  errorsSubscription!: Subscription;

  constructor(private errorsService: ErrorsService, private router: Router) { }

  ngOnInit(): void {
    this.errorsSubscription = this.errorsService.errorsSubject.subscribe(
      (errors: Error[]) => {
        this.errors = errors;
      }
    );
    this.errorsService.getErrors();
    this.errorsService.emitErrors();
  }

  onNewError() {
    this.router.navigate(['/errors', 'new']);
  }

  onDeleteError(error: Error) {
    this.errorsService.removeError(error);
  }

  onViewError(id: number) {
    this.router.navigate(['/errors', 'view', id]);
  }

  ngOnDestroy() {
    this.errorsSubscription.unsubscribe();
  }

}
