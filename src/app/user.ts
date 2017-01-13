import { Address } from './address';

export class User {

  constructor(private displayName: string,
              private email: string,
              private uid: string,
              private orders?: string[],
              private addresses?: Address[]) {

  }
}
