export class Error {

  photo!: string;

  constructor(public title: string,
              public definition: string,
              public solution: string,
              public definitionCode: string,
              public solutionCode: string ) {}
}
