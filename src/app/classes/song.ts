export class Song {
    
    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }

    get album(): any {
        return this._album;
    }

    constructor(private _id: string, private _name: string, private _album: any) { }
    
}