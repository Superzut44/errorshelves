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
  fileIsUploading = false;
  fileUrl!: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private errorsService: ErrorsService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.errorForm = this.formBuilder.group( {
      title: ['', Validators.required],
      definition: ['', Validators.required],
      solution: ['', Validators.required],
      definitionCode: ['', Validators.required],
      solutionCode: ['', Validators.required],
    });
  }

  onSaveError() {
    const title = this.errorForm.get('title')?.value;
    const definition = this.errorForm.get('definition')?.value;
    const solution = this.errorForm.get('solution')?.value;
    const definitionCode = this.errorForm.get('definitionCode')?.value;
    const solutionCode = this.errorForm.get('solutionCode')?.value;
    const newError = new Error(title, definition, solution, definitionCode, solutionCode);
    if(this.fileUrl && this.fileUrl !== '') {
      newError.photo = this.fileUrl;
    }
    this.errorsService.createNewError(newError);
    this.router.navigate(['/errors']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.errorsService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    )
  }

  detectFiles(event: any) {
    this.onUploadFile(event.target.files[0]);
  }

}
