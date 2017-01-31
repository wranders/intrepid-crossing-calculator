export class LookupResult {
  constructor(public id: number,
    public success: boolean,  
    public name: string,
    public jitaBuyPrice: number,
    public quantity: number,
    public itemId : number) { }
}