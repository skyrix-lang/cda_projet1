import { Store } from "./Store";

export class Context {
  store = new Store();
}

export const ctx = new Context();
