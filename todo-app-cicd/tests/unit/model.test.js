const { TodoService } = require("../../js/model");

// Reset Singleton trước mỗi test
beforeEach(() => {
  TodoService.instance = null;
});

describe("TodoService Unit Tests", () => {
  test("addTodo should add a new todo item", () => {
    const service = new TodoService();

    service.addTodo("Learn Jest");

    expect(service.todos.length).toBe(1);
    expect(service.todos[0].text).toBe("Learn Jest");
    expect(service.todos[0].completed).toBe(false);
  });

  test("toggleTodoComplete should toggle completed status", () => {
    const service = new TodoService();

    service.addTodo("Write unit tests");
    const todoId = service.todos[0].id;

    service.toggleTodoComplete(todoId);

    expect(service.todos[0].completed).toBe(true);
  });

  test("should not add a todo if text is empty", () => {
    const service = new TodoService();

    service.addTodo("");

    expect(service.todos.length).toBe(0);
  });

  test("removeTodo should remove a todo item", () => {
    const service = new TodoService();

    service.addTodo("Task 1");
    service.addTodo("Task 2");

    const removedId = service.todos[0].id;
    service.removeTodo(removedId);

    // Chỉ còn 1 todo
    expect(service.todos.length).toBe(1);

    // Todo bị xóa không còn tồn tại
    const removedTodo = service.todos.find((t) => t.id === removedId);
    expect(removedTodo).toBeUndefined();
  });
});
