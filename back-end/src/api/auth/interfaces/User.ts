export default interface User {
  _id: string;
  email: string;
  name: string;
  limit: number;
  lastTokenResetDate: string;
}
