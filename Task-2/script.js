// ---- State ----
let entries = []; // { id, text, managed }
let filter = "all"; // "all" | "active" | "completed"

// ---- DOM references ----
const composer = document.getElementById("composer");
const taskInput = document.getElementById("taskInput");
const list = document.getElementById("list");
const scroll = document.querySelector(".scroll");
const countLabel = document.getElementById("count");
const filtersBar = document.getElementById("filters");
const clearCompletedBtn = document.getElementById("clearCompleted");

// ---- Helpers ----
function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function getVisibleEntries() {
  if (filter === "active") return entries.filter((e) => !e.managed);
  if (filter === "completed") return entries.filter((e) => e.managed);
  return entries;
}

function render() {
  list.innerHTML = "";

  const visible = getVisibleEntries();

  visible.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "entry" + (entry.managed ? " is-managed" : "");
    li.dataset.id = entry.id;

    li.innerHTML = `
      <button class="entry__check" aria-label="Mark as managed">
        <svg viewBox="0 0 24 24" fill="none" stroke="#15100B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>
      <span class="entry__label"></span>
      <button class="entry__remove" aria-label="Remove from the list">&times;</button>
    `;

    // textContent only — never insert raw user input as HTML.
    li.querySelector(".entry__label").textContent = entry.text;

    list.appendChild(li);
  });

  const activeCount = entries.filter((e) => !e.managed).length;
  countLabel.textContent =
    activeCount === 0 && entries.length > 0
      ? "Mischief managed"
      : `${activeCount} thing${activeCount === 1 ? "" : "s"} afoot`;

  scroll.classList.toggle("is-empty", entries.length === 0);
}

// ---- Actions ----
function addEntry(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  entries.push({ id: createId(), text: trimmed, managed: false });
  render();
}

function toggleEntry(id) {
  const entry = entries.find((e) => e.id === id);
  if (entry) entry.managed = !entry.managed;
  render();
}

function removeEntry(id) {
  entries = entries.filter((e) => e.id !== id);
  render();
}

function clearManaged() {
  entries = entries.filter((e) => !e.managed);
  render();
}

function setFilter(newFilter) {
  filter = newFilter;
  [...filtersBar.children].forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.filter === newFilter);
  });
  render();
}

// ---- Event listeners ----
composer.addEventListener("submit", (e) => {
  e.preventDefault();
  addEntry(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});

// Event delegation: one listener on the list handles every entry's
// check/remove buttons, including entries added after page load.
list.addEventListener("click", (e) => {
  const li = e.target.closest(".entry");
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.closest(".entry__check")) {
    toggleEntry(id);
  } else if (e.target.closest(".entry__remove")) {
    removeEntry(id);
  }
});

filtersBar.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  setFilter(btn.dataset.filter);
});

clearCompletedBtn.addEventListener("click", clearManaged);

// ---- Initial render ----
render();
