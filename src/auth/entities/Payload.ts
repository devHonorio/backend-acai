import { Rulles } from 'src/rulles/rulles';

export class Payload {
  sub: string;
  username: string;
  phone: string;
  rulles?: Rulles[];
}
