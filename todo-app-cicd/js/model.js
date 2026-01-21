class TodoService {
  static instance = null;

  constructor() {
    if (TodoService.instance) {
      return TodoService.instance;
    }

    this.todos = [];
    this.observers = [];

    TodoService.instance = this;
  }

  // Observer pattern
  addObserver(observer) {
    this.observers.push(observer);
  }

  notify() {
    this.observers.forEach((observer) => observer.update(this.todos));
  }

  addTodo(text) {
    if (!text || text.trim() === "") return;

    this.todos.push({
      // FIX: đảm bảo ID luôn unique (quan trọng cho unit test)
      id: Date.now() + Math.random(),
      text,
      completed: false,
    });

    this.notify();
  }

  toggleTodoComplete(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return;

    todo.completed = !todo.completed;
    this.notify();
  }

  removeTodo(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.notify();
  }

  getTodos() {
    return this.todos;
  }
}

module.exports = { TodoService };
