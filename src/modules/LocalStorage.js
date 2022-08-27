class LocalStorage {
  list = [];

  constructor() {
    const tasks = JSON.parse(localStorage.getItem('list'));

    tasks?.forEach((task) => this.list.push(task));
  }

  read() {
    return this.list;
  }

  update(tasks) {
    this.list = tasks;
    localStorage.setItem('list', JSON.stringify(this.list));
  }
}

const ls = new LocalStorage();

export default ls;
