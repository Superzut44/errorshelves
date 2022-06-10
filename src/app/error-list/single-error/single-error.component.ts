import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Error } from 'src/app/models/Error.model';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-single-error',
  templateUrl: './single-error.component.html',
  styleUrls: ['./single-error.component.scss']
})
export class SingleErrorComponent implements OnInit {

  error!: Error;

  constructor(private route: ActivatedRoute,
              private errorsService: ErrorsService,
              private router: Router) { }

  ngOnInit(): void {
    this.error = new Error('', '', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.errorsService.getSingleError(+id).then(
      (error: Error) => {
        this.error = error;
      }
    );
  }

  onBack() {
    this.router.navigate(['/errors']);
  }

}
