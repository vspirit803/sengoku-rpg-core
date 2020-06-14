import { Buff } from './Buff';
import { Status } from './Status';

/**
 * Buff - 属性Buff
 */
export class PropertyBuff extends Buff {
  /**属性名称 */
  name: string;
  /**属性百分比加成 */
  percent: number;
  /**属性固定值加成 */
  value: number;
  constructor(status: Status, { name, percent = 0, value = 0 }: { name: string; percent?: number; value?: number }) {
    super(status);
    this.name = name;
    this.percent = percent;
    this.value = value;
    this.init();
  }

  /**buff初始化 */
  init(): void {
    this.status.source.properties[this.name].extraPercent += this.percent;
    this.status.source.properties[this.name].extraValue += this.value;
  }

  /**buff的取消 */
  destroy(): void {
    this.status.source.properties[this.name].extraPercent -= this.percent;
    this.status.source.properties[this.name].extraValue -= this.value;
  }
}
