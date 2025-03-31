function addRow() {
  let table = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow();

  for (let i = 0; i < 5; i++) {
    let cell = newRow.insertCell();
    let input = document.createElement("input");
    input.type = i === 2 ? "email" : i === 3 ? "tel" : "text";

    let headerText = document
      .querySelector(`#dataTable thead tr th:nth-child(${i + 1})`)
      .innerText.trim();
    input.placeholder = `Enter ${headerText}`;

    cell.appendChild(input);
  }

  // Add a delete button to the new row
  let deleteCell = newRow.insertCell();
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.classList.add("btn", "btn-sm", "btn-danger");
  deleteBtn.onclick = function () {
    deleteRow(this);
  };
  deleteCell.appendChild(deleteBtn);
}

function deleteRow(button) {
  let table = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  let rowCount = table.rows.length;

  if (button) {
    button.parentElement.parentElement.remove(); // Remove specific row
  } else if (rowCount > 1) {
    table.deleteRow(rowCount - 1); // Delete last row
  } else {
    alert("At least one row must remain.");
  }
}

function exportToCSV() {
  let table = document.getElementById("dataTable");
  let rows = table.querySelectorAll("tbody tr");
  let csvContent = "First-Name,Last-Name,Email,Phone,Country\n"; // CSV Headers

  for (let row of rows) {
    let rowData = [];
    let inputs = row.querySelectorAll("input");

    for (let i = 0; i < inputs.length; i++) {
      let value = inputs[i].value.trim();

      // Check if any field is empty
      if (!value) {
        alert("All fields must be filled before exporting!");
        return; // Stop execution
      }

      // Validate phone number (allow numbers, spaces, dashes, and +)
      if (i === 3 && !/^[+\d][\d\s-]+$/.test(value)) {
        alert(
          "Phone number must contain only numbers, spaces, dashes, or '+'!"
        );
        return; // Stop execution
      }

      rowData.push(value);
    }

    csvContent += rowData.join(",") + "\n"; // Append row to CSV
  }

  // Create a downloadable CSV file
  let blob = new Blob([csvContent], { type: "text/csv" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "table_data.csv";
  a.click();
}
