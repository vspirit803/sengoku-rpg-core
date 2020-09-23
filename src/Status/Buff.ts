import { Status } from './Status';

/**Buff的抽象基类 */
export abstract class Buff {
  status: Status;
  constructor(status: Status) {
    this.status = status;
  }

  abstract destroy(): void;
}
