export class Playlist {
    
    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }

    get ownerId(): string {
        return this._ownerId;
    }

    get uri(): string {
        return this.uri;
    }

    constructor(private _id: string, private _name: string, private _ownerId: string, private _uri: string) { }   
}