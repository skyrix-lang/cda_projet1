import { observable } from "mobx";

export class Store {
  @observable session: any = {name:"", role:"", id:-1};

  setName(name: string): boolean {
    this.session.name = name;
    return this.session.name === name;
  }

  getName(): string {
    return this.session.name;
  }

  setRole(role: string): boolean {
    this.session.role = role;
    return this.session.role === role;
  }

  getRole(): string {
    return this.session.role;
  }

  setId(id: number) {
    this.session.id = id;
    return this.session.id === id;
  }

  getId(): string {
    return this.session.id;
  }
}
