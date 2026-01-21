const { test, expect, _electron: electron } = require("@playwright/test");

test("End-to-end user workflow", async () => {
  // Launch the Electron app
  const electronApp = await electron.launch({ args: ["."] });
  const window = await electronApp.firstWindow();

  const taskText = "My new E2E test task";

  // --- TODO: Task 1: Add a new todo item ---
  // 1. Find the input field (use a locator like window.locator('#todo-input')).
  const input = window.locator("#todo-input");
  // 2. Type the `taskText` into it.
  await input.fill(taskText);
  // 3. Find and click the "Add" button.
  const addBtn = window.locator("#add-todo-btn");
  await addBtn.click();

  // --- TODO: Task 2: Verify the todo item was added ---
  // 1. Locate the new todo item in the list. A good locator might be `window.locator('.todo-item')`.
  const todoItem = window.locator(".todo-item").first();
  // 2. Assert that its text content contains the `taskText`.
  await expect(todoItem).toContainText(taskText);

  // --- TODO: Task 3: Mark the todo item as complete ---
  // 1. Find the checkbox within the new todo item.
  // 2. Click the checkbox.
  // 3. Assert that the todo item now has the 'completed' class.
  // --- Task 3: Mark the todo item as complete ---
  const checkbox = todoItem.locator('input[type="checkbox"]');
  await checkbox.click();

  // ✅ ASSERT ĐÚNG THEO UI THẬT
  await expect(checkbox).toBeChecked();

  // --- TODO: Task 4: Delete the todo item ---
  // 1. Find the delete button within the todo item.
  // 2. Click the delete button.
  await todoItem.locator(".delete-btn").click();
  // 3. Assert that the todo item is no longer visible on the page.

  // Close the app
  await electronApp.close();
});
