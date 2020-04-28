import { TeamNormal } from './TeamNormal';
import { CharacterBattle } from '@src/Character';
import { FactionBattle } from '@src/Faction';
import { BattleBattle } from '@src/Battle';
import { Game } from '@src/Game';
import { UUID, Properties } from '@src/Common';

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

    // includes(id: string): boolean {
    //     throw new Error('Method not implemented.');
    // }

    // addMember(member: CharacterBattle): void {
    //     throw new Error('Method not implemented.');
    // }

    // removeMember(member: CharacterBattle): void {
    //     throw new Error('Method not implemented.');
    // }

    // swapMember(memberA: CharacterBattle, memberB: CharacterBattle): void {
    //     throw new Error('Method not implemented.');
    // }

    // replaceMember(memberBefore: CharacterBattle, memberAfter: CharacterBattle): void {
    //     throw new Error('Method not implemented.');
    // }

    includes(id: string): boolean {
        return this.members.map((each) => each.id).includes(id);
    }

    addMember(member: CharacterBattle): void {
        if (this.members.includes(member)) {
            throw new Error(`[${member.id}]${member.name}已在队伍中`);
        }
        if (this.members.length >= Properties.MaxTeamMembersNum) {
            throw new Error(`队伍成员数已达上限(${Properties.MaxTeamMembersNum})`);
        }
        this.members.push(member);
    }

    removeMember(member: CharacterBattle): void {
        if (!this.members.includes(member)) {
            throw new Error(`[${member.id}]${member.name}不在队伍中`);
        }
        this.members.splice(this.members.indexOf(member), 1);
    }

    swapMember(memberA: CharacterBattle, memberB: CharacterBattle): void {
        if (!this.members.includes(memberA)) {
            throw new Error(`[${memberA.id}]${memberA.name}不在队伍中`);
        }
        if (!this.members.includes(memberB)) {
            throw new Error(`[${memberB.id}]${memberB.name}不在队伍中`);
        }
        const indexA = this.members.indexOf(memberA);
        const indexB = this.members.indexOf(memberB);
        this.members.splice(indexA, 1, memberB);
        this.members.splice(indexB, 1, memberA);
    }

    replaceMember(memberBefore: CharacterBattle, memberAfter: CharacterBattle): void {
        const index = this.members.indexOf(memberBefore);
        if (index === -1) {
            throw new Error(`[${memberBefore.id}]${memberBefore.name}不在队伍中`);
        }
        this.members.splice(index, 1, memberAfter);
    }
}
