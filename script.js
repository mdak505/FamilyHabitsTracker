let currentUser = localStorage.getItem("currentUser") || "Dad";
let habits = loadHabits(currentUser);

function saveHabits() {
  localStorage.setItem(`habits_${currentUser}`, JSON.stringify(habits));
}

function loadHabits(user) {
  return JSON.parse(localStorage.getItem(`habits_${user}`)) || [];
}

function switchUser() {
  const select = document.getElementById("userSelect");
  currentUser = select.value;
  localStorage.setItem("currentUser", currentUser);
  habits = loadHabits(currentUser);
  updateAvatar();
  renderHabits();
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("userSelect").value = currentUser;
  renderHabits();
});
updateAvatar();
}
function updateAvatar() {
  const avatarImage = document.getElementById("avatarImage");
  let fileName = currentUser.toLowerCase(); // Dad -> dad.png
  avatarImage.src = `avatars/${fileName}.png`;
}

function renderHabits() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.className = habit.completed ? "checked" : "";
    li.innerHTML = `
      ${habit.text}
      <div>
        <button onclick="toggleHabit(${index})">✔</button>
        <button onclick="deleteHabit(${index})">❌</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function addHabit() {
  const input = document.getElementById("habitInput");
  const text = input.value.trim();

  if (text !== "") {
    habits.push({ text, completed: false });
    input.value = "";
    saveHabits();
    renderHabits();
  }
}

function toggleHabit(index) {
  habits[index].completed = !habits[index].completed;
  saveHabits();
  renderHabits();
}

function deleteHabit(index) {
  habits.splice(index, 1);
  saveHabits();
  renderHabits();
}

// Set dropdown to correct user on load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("userSelect").value = currentUser;
  renderHabits();
});
