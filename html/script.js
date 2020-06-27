var selectedRow = null

function fetchBooks(){
    fetch('http://localhost:8000/books')
    .then(resp => resp.json())
    .then(loadBooks)
}

function loadBooks(books) {
    books.forEach(function (book) {
        insertNewRecord(book);
    });
}

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null) {
            fetch(`http://localhost:8000/books`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
            })
            .then(resp => resp.json())
            .then(insertNewRecord)
            .then(resetForm);
        }
        else {
            formData['ID'] = parseInt(formData['ID']);
            fetch(`http://localhost:8000/books`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(resp => resp.json())
            .then(updateRecord)
            .then(resetForm);
        }
    }
}

function readFormData() {
    var formData = {};
    formData["ID"] = document.getElementById("ID").value;
    formData["Title"] = document.getElementById("Title").value;
    formData["Author"] = document.getElementById("Author").value;
    formData["Year"] = document.getElementById("Year").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("bookList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.ID;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.Title;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.Author;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.Year;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("ID").value = "";
    document.getElementById("Title").value = "";
    document.getElementById("Author").value = "";
    document.getElementById("Year").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("ID").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Title").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Author").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Year").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.ID;
    selectedRow.cells[1].innerHTML = formData.Title;
    selectedRow.cells[2].innerHTML = formData.Author;
    selectedRow.cells[3].innerHTML = formData.Year;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        id = parseInt(row.cells[0].innerHTML);
        fetch(`http://localhost:8000/books/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(function(book) {
            document.getElementById("bookList").deleteRow(row.rowIndex);
            resetForm();
        });
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("ID").value == "") {
        isValid = false;
        document.getElementById("IDValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("IDValidationError").classList.contains("hide"))
            document.getElementById("IDValidationError").classList.add("hide");
    }
    return isValid;
}