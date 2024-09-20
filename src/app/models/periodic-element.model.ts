export class PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;

  public constructor(position: number, name: string, weight: number, symbol: string) {
    this.position = position;
    this.name = name;
    this.weight = weight;
    this.symbol = symbol;
  }
}
