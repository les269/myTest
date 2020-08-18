import { ListItem } from './list/listItem';

export class Test {
  type: ListItem;
  constructor(type: ListItem) {
    this.type = type;
  }
  get imm() {
    return this.type.img;
  }
  doTest() {
    return this.type.img;
  }

}
