export default class InvalidDate extends Error {
  constructor(id) {
    super();
    this.message = "Los campos de fecha deben estar en formato date.";
  }
}