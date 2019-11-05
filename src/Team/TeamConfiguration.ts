export class TeamConfiguration {
    name: string;
    id: string;
    memberIds: Array<string>;
    constructor() {
        this.name = '未命名队伍';
        this.id = 'Team.0001';
        this.memberIds = new Array<string>(0);
    }
}
