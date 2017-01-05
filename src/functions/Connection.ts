
export default class Connection {
  static connectionExisted(connections, connection) {
    return connections.find(item => item.from.id === connection.from.id && item.to.id === connection.to.id);
  }
  private from;
  private to;
  private id;

  constructor(connect) {
    if (Array.isArray(connect)) {
      this.from = {
        id: connect[0],
      };
      this.to = {
        id: connect[1],
      };
    } else if (connect.constructor === Object) {
      const { from, to } = connect;
      this.from = from;
      this.to = to;
    } else {
      console.error('constructor Connection failed');
    }

    this.id = `${this.from.id}[${this.from.point}]-${this.to.id}[${this.to.point}]`;
  }
}