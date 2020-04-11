import { TeamNormal } from './TeamNormal';
import { CharacterBattle } from '@src/Character/CharacterBattle';
import { FactionBattle } from '@src/Faction/FactionBattle';
import { BattleBattle } from '@src/Battle/BattleBattle';
import { Game } from '@src/Game';
import { UUID } from '@src/Common';

/**
 * 队伍(战斗状态)
 */
export class TeamBattle implements TeamNormal, UUID {
    name: string;
    /**队伍id */
    uuid: symbol;
    /**队伍成员 */
    members: Array<CharacterBattle>;
    /**队伍所处的阵营 */
    faction?: FactionBattle;
    /**队伍所处的战斗 */
    battle?: BattleBattle;
    /**指令点,用于施放技能 */
    orderPoint: number; //指令点,用于施放技能
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(team: TeamNormal, game: Game) {
        this.uuid = Symbol('TeamBattle');
        this.name = team.name;
        this.members = [];
        this.addMembers(...team.members.map((eachMemberNormal) => new CharacterBattle(eachMemberNormal)));
        this.orderPoint = 0;
    }

    /** 队伍是否"存活",只要队伍至少有一人存活,则队伍存活 */
    get isAlive(): boolean {
        return this.members.some((eachMember) => eachMember.isAlive);
    }

    addMembers(...members: Array<CharacterBattle>): void {
        members.forEach((eachMember) => {
            this.members.push(eachMember);
            eachMember.setTeam(this);
        });
    }

    setBattle(battle: BattleBattle): void {
        this.battle = battle;
        this.members.forEach((eachMember) => {
            eachMember.setBattle(battle);
        });
    }

    setFaction(faction: FactionBattle): void {
        this.faction = faction;
        this.members.forEach((eachMember) => {
            eachMember.setFaction(faction);
        });
    }

    includes(id: string): boolean {
        throw new Error('Method not implemented.');
    }

    addMember(member: CharacterBattle): void {
        throw new Error('Method not implemented.');
    }

    removeMember(member: CharacterBattle): void {
        throw new Error('Method not implemented.');
    }

    swapMember(memberA: CharacterBattle, memberB: CharacterBattle): void {
        throw new Error('Method not implemented.');
    }

    replaceMember(memberBefore: CharacterBattle, memberAfter: CharacterBattle): void {
        throw new Error('Method not implemented.');
    }
}
