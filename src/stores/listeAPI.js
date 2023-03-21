export default class ListeAPI {
  static async speichern(aufgaben) {
    localStorage.setItem('aufgaben-liste', JSON.stringify(aufgaben));
  }

  static async laden() {
    return JSON.parse(localStorage.getItem('aufgaben-liste') || '[]');
  }
}
