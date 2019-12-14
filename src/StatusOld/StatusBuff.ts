import { CharacterBattle } from '../Character/CharacterBattle';
import { StatusBase } from './StatusBase';

/**能否驱散 */
enum Dispellable {
    NEVER, //无法驱散
    DEATH_DISPEL, //死亡驱散
    STRONG_DISPEL, //强驱散
    BASIC_DISPEL, //基础驱散
}

/**属性Buff */
type PropertyBuff = {
    /**属性名称 */
    name: string;
    /**属性百分比加成 */
    percent: number;
    /**属性固定值加成 */
    value: number;
};

/**事件Buff */
type EventBuff = {
    /** */
}

/**
 * 状态 - Buff
 */
export class StatusBuff extends StatusBase {
    dispellable: Dispellable;
    propertyBuffs: Array<PropertyBuff>;
    constructor({
        source,
        target,
        propertyBuffs = [],
        dispellable = Dispellable.DEATH_DISPEL,
    }: {
        source: CharacterBattle;
        target: CharacterBattle;
        propertyBuffs?: Array<PropertyBuff>;
        dispellable?: Dispellable;
    }) {
        super({ source, target, duration: 'forever' });
        this.dispellable = dispellable;
        this.propertyBuffs = propertyBuffs;
    }

    /**buff初始化 */
    init(): void {
        for (const eachPropertyBuff of this.propertyBuffs) {
            const eachPropertyName = eachPropertyBuff.name;
            this.source.properties[eachPropertyName].extraPercent += eachPropertyBuff.percent;
            this.source.properties[eachPropertyName].extraValue += eachPropertyBuff.value;
        }
    }

    /**buff的取消 */
    destroy(): void {
        for (const eachPropertyBuff of this.propertyBuffs) {
            const eachPropertyName = eachPropertyBuff.name;
            this.source.properties[eachPropertyName].extraPercent -= eachPropertyBuff.percent;
            this.source.properties[eachPropertyName].extraValue -= eachPropertyBuff.value;
        }
    }

    /**经过一回合 */
    afterRound(): void {
        if (this.duration !== 'forever') {
            this.duration--;
            if (this.duration === 0) {
                // todo
                // buff到期
            }
        }
    }
}
