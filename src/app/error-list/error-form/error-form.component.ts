import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Error } from 'src/app/models/Error.model';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.scss']
})
export class ErrorFormComponent implements OnInit {

  errorForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private errorsService: ErrorsService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.errorForm = this.formBuilder.group( {
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onSaveError() {
    const title = this.errorForm.get('title')?.value;
    const author = this.errorForm.get('author')?.value;
    const newError = new Error(title, author);
    this.errorsService.createNewError(newError);
    this.router.navigate(['/errors']);
  }

}
