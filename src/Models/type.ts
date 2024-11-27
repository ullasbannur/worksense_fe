export interface rooms{
    name:string;
    occupancy:number;
}

export interface type1{
    uid:string;
    name:string;
    room: Array<rooms>;
}
