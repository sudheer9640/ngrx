export class BillingDetails {
  name: string;
  email: string;
  phoneNumber: number | undefined;
  address: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.address = '';
  }
}
