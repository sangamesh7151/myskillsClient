
export class ReferenceDataViewModel {
  key: number;
  value: string;
  description: string;

  constructor(key: number, Value: string, Description: string) {
    this.key = key;
    this.value = Value;
    this.description = Description;
  }
}
