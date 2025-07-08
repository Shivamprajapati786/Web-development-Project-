let students = JSON.parse(localStorage.getItem("students")) || [];

const studentForm = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("search");
const filterDept = document.getElementById("filterDept");

function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderStudents(data = students) {
  tableBody.innerHTML = "";
  const departments = new Set();

  data.forEach((student, index) => {
    departments.add(student.dept);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.regNo}</td>
      <td>${student.dept}</td>
      <td>${student.year}</td>
      <td>${student.marks}</td>
      <td>
        <button class="edit" onclick="editStudent(${index})">Edit</button>
        <button class="delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  filterDept.innerHTML = `<option value="">Filter by Department</option>`;
  [...departments].forEach(dept => {
    const opt = document.createElement("option");
    opt.value = dept;
    opt.textContent = dept;
    filterDept.appendChild(opt);
  });
}

studentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const student = {
    name: name.value,
    regNo: regNo.value,
    dept: dept.value,
    year: year.value,
    marks: marks.value
  };

  students.push(student);
  saveToLocalStorage();
  renderStudents();
  studentForm.reset();
});

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    saveToLocalStorage();
    renderStudents();
  }
}

function editStudent(index) {
  const s = students[index];
  name.value = s.name;
  regNo.value = s.regNo;
  dept.value = s.dept;
  year.value = s.year;
  marks.value = s.marks;

  students.splice(index, 1); // remove temporarily
  renderStudents();
}

searchInput.addEventListener("input", function () {
  const value = searchInput.value.toLowerCase();
  const filtered = students.filter(
    s => s.name.toLowerCase().includes(value) || s.regNo.toLowerCase().includes(value)
  );
  renderStudents(filtered);
});

filterDept.addEventListener("change", function () {
  const value = filterDept.value;
  const filtered = value ? students.filter(s => s.dept === value) : students;
  renderStudents(filtered);
});

renderStudents();
