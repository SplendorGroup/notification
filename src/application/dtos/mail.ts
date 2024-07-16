export class Options {
  template: string;

  html?: string;

  variables: Variable[];
}

export class Variable {
  name: string;

  value: string;
}
