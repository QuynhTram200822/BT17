const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const closeButton = document.querySelector('.button-cls');
const closeBtnFiler = document.querySelector('.close-filter ');

const filter = document.querySelector('.filter');



let students = [
];
let currentEditingStudent = null;

function addStudent(event) {
  event.preventDefault();
  // Lấy giá trị từ form
  let name = document.getElementById('name').value;
  let studentCode = document.getElementById('studentCode').value;
  let email = document.getElementById('email').value;
  let department = document.getElementById('department').value;
  let gender = document.getElementById('gender').value;
  let birthDate = document.getElementById('birthDate').value;

  // Tạo đối tượng sinh viên mới
  let newStudent = {
    name: name,
    studentCode: studentCode,
    email: email,
    department: department,
    gender: gender,
    birthDate: birthDate,
  };

  students.push(newStudent);
  document.getElementById('myForm').reset();
  renderStudentList();
}
document.getElementById('myForm').addEventListener('submit', addStudent);

// Hàm để render danh sách sinh viên vào HTML
function renderStudentList() {
  let studentListDiv = document.getElementById('studentList');
  studentListDiv.innerHTML = '';

  // Tạo một bảng để hiển thị danh sách sinh viên
  let table = document.createElement('table');
  let headerRow = table.insertRow();
  let headers = ['Name', 'Student Code', 'Email', 'Department', 'Gender', 'Birth Date', 'Action'];

  // Tạo header của bảng
  headers.forEach(function (headerText) {
    let header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  // Thêm các sinh viên vào bảng
  students.forEach(function (student) {
    let row = table.insertRow();
    Object.keys(student).forEach(function (key) {
      let cell = row.insertCell();
      cell.textContent = student[key];
    });
    // Tạo nút Edit
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function () {
      // Điền dữ liệu của hàng vào modal form
      document.getElementById('editName').value = student.name;
      document.getElementById('editStudentCode').value = student.studentCode;
      document.getElementById('editEmail').value = student.email;
      document.getElementById('editDepartment').value = student.department;
      document.getElementById('editGender').value = student.gender;
      document.getElementById('editBirthDate').value = student.birthDate;

      currentEditingStudent = student;
      // Hiển thị modal
      modal.style.display = "block";
    });
    // Tạo nút Remove
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', function () {
      if (confirm(`Are you sure you want to delete ${student.name}?`)) {
        deleteStudent(student);
      }
    });
    let actionCell = row.insertCell();
    actionCell.appendChild(editButton);
    actionCell.appendChild(removeButton);
  });
  studentListDiv.appendChild(table);
}

closeBtn.onclick = function () {
  modal.style.display = "none";
}

// Xử lý khi nhấn Update trên modal form để cập nhật sinh viên
function updateStudent() {
  // Lấy dữ liệu từ các trường input trong modal
  let editedName = document.getElementById('editName').value;
  let editedStudentCode = document.getElementById('editStudentCode').value;
  let editedEmail = document.getElementById('editEmail').value;
  let editedDepartment = document.getElementById('editDepartment').value;
  let editedGender = document.getElementById('editGender').value;
  let editedBirthDate = document.getElementById('editBirthDate').value;

  // Cập nhật thông tin của sinh viên đang chỉnh sửa
  currentEditingStudent.name = editedName;
  currentEditingStudent.studentCode = editedStudentCode;
  currentEditingStudent.email = editedEmail;
  currentEditingStudent.department = editedDepartment;
  currentEditingStudent.gender = editedGender;
  currentEditingStudent.birthDate = editedBirthDate;

  renderStudentList();

  modal.style.display = "none";
}

// Hàm xóa sinh viên
function deleteStudent(student) {
  let index = students.findIndex(s => s === student);

  if (index !== -1) {
    students.splice(index, 1);
    renderStudentList();
  } else {
    console.error('Student not found');
  }
}

// Hàm tìm kiếm sinh viên
function searchStudent() {
  // Lấy giá trị từ ô nhập liệu

  let searchText = document.getElementById('searchInput').value.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim();

  // Tạo mảng mới để lưu kết quả tìm kiếm
  let searchResults = students.filter(student =>
    student.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchText)
  );

  // Render danh sách sinh viên tìm được
  renderFilteredStudentList(searchResults);
}

// Hàm để render danh sách sinh viên tìm được
function renderFilteredStudentList(results) {
  let studentListDiv = document.getElementById('studentList');
  studentListDiv.innerHTML = '';

  if (results.length === 0) {
    studentListDiv.innerHTML = '<p>No matching students found.</p>';
    return;
  }

  // Tạo bảng để hiển thị kết quả tìm kiếm
  let table = document.createElement('table');
  let headerRow = table.insertRow();
  let headers = ['Name', 'Student Code', 'Email', 'Department', 'Gender', 'Birth Date', 'Action'];

  // Tạo header của bảng
  headers.forEach(function (headerText) {
    let header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  // Thêm các sinh viên vào bảng
  results.forEach(function (student) {
    let row = table.insertRow();
    Object.keys(student).forEach(function (key) {
      let cell = row.insertCell();
      cell.textContent = student[key];
    });

    // Tạo nút Edit
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function () {
      currentEditingStudent = student;
      document.getElementById('editName').value = student.name;
      document.getElementById('editStudentCode').value = student.studentCode;
      document.getElementById('editEmail').value = student.email;
      document.getElementById('editDepartment').value = student.department;
      document.getElementById('editGender').value = student.gender;
      document.getElementById('editBirthDate').value = student.birthDate;
      modal.style.display = "block";
    });

    // Tạo nút Remove
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', function () {
      if (confirm(`Are you sure you want to delete ${student.name}?`)) {
        deleteStudent(student);
      }
    });

    let actionCell = row.insertCell();
    actionCell.appendChild(editButton);
    actionCell.appendChild(removeButton);
  });

  studentListDiv.appendChild(table);
}

function clearInput() {
  searchInput.value = '';
  closeButton.style.display = 'none';
  renderStudentList();
}

function displayFilterForm() {
  filter.style.display = "block";

}
closeBtnFiler.onclick = function () {
  filter.style.display = "none";
}
function normalizeString(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}
// Function to filter students
function filterStudents() {
  let filterName = normalizeString(document.getElementById('filterName').value);
  let filterStudentCode = document.getElementById('filterStudentCode').value;
  let filterEmail = document.getElementById('filterEmail').value;
  let filterDepartment = document.getElementById('filterDepartment').value;
  let filterGender = document.getElementById('filterGender').value;
  let filterBirthDate = document.getElementById('filterBirthDate').value;

  let filteredStudents = students.filter(student => {
    let studentName = normalizeString(student.name);
    if (filterName && !studentName.includes(filterName)) {
      return false;
    }
    if (filterStudentCode && student.studentCode !== filterStudentCode) {
      return false;
    }
    if (filterEmail && student.email !== filterEmail) {
      return false;
    }
    if (filterDepartment !== 'All' && student.department !== filterDepartment) {
      return false;
    }
    if (filterGender !== 'All' && student.gender !== filterGender) {
      return false;
    }
    if (filterBirthDate && student.birthDate !== filterBirthDate) {
      return false;
    }
    return true;
  });
  renderFilteredStudentList(filteredStudents);
}

// Function to reset filter
function resetFilter() {
  document.getElementById('filterName').value = '';
  document.getElementById('filterStudentCode').value = '';
  document.getElementById('filterEmail').value = '';
  document.getElementById('filterDepartment').value = 'All';
  document.getElementById('filterGender').value = 'All';
  document.getElementById('filterBirthDate').value = '';

  renderStudentList();
}