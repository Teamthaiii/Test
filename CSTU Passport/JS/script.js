/*
  File: script.js
  Author: CS100 Team
  Date Created: 23 July 2023
  Copyright: CSTU
  Description: JS code of CSTU Passport that validate with JS
*/

const config = {
  backendUrl: "http://localhost:8000/", // Default backend URL
};
const port = 8000;

fetch(`http://${window.location.hostname}:${port}/record`)
  .then(res => {
    return res.json();
  })
  .then(data => {
    data.forEach(record => {
      const markup = `<div class="col">
                      <span>${record.first_name}</span>
                      <span>${record.last_name}</span>
                      <h4>${record.student_id}</h4>
                      <h4>${record.email}</h4>
                      <h4>${record.title}</h4>
                      <h4>${record.type_of_work_id}</h4>
                      <h4>${record.academic_year}</h4>
                      <h4>${record.semester}</h4>
                      <h4>${record.start_date}</h4>
                      <h4>${record.end_date}</h4>
                      <h4>${record.location}</h4>
                      <h4>${record.description}</h4>
                      </div>
                      `;

      document.querySelector('.row').insertAdjacentHTML('beforeend', markup);
    });
  })
  .catch(error => console.log(error));

// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");

  if (names.length !== 2) {
    errorElement.textContent = "Please enter both your Firstname and Lastname.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^\d{10}$/;
  const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test(studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)) {
    errorElement.textContent =
      "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateStudentID();
  validateEmail();
}

// Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});

// Function to submit the form
// Function to submit the form
async function submitForm(event) {
  event.preventDefault();

  // Validate form inputs before submission
  if (!validateName() || !validateStudentID() || !validateEmail()) {
    return;
  }

  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate) {
    alert("End datetime should be after the start datetime.");
    return;
  }

  // Create the data object to send to the backend
  const formData = new FormData(event.target);
  const data = {
    first_name: formData.get("fullname").split(" ")[0],
    last_name: formData.get("fullname").split(" ")[1],
    student_id: parseInt(formData.get("studentID")),
    email: formData.get("email"),
    title: formData.get("workTitle"),
    type_of_work_id: parseInt(formData.get("activityType")),
    academic_year: parseInt(formData.get("academicYear")) - 543,
    semester: parseInt(formData.get("semester")),
    start_date: formData.get("startDate"),
    end_date: formData.get("endDate"),
    location: formData.get("location"),
    description: formData.get("description")
  };

  console.log(data);

  try {
    // Send data to the backend using POST request
    const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Form data submitted successfully!");

      // Display success message with formatted data
      //create div class col
      var colDiv = document.createElement('div');
      colDiv.className = 'col';

      // Format JSON data for display to h4 fname
      let formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "first_name")
        .map(([key, value]) => `${value} `)
        .join("\n");

      var spanElement = document.createElement('span');
      spanElement.id = 'fname';
      spanElement.textContent = formattedData;
      colDiv.appendChild(spanElement);

      // Format JSON data for display to h4 lname
      formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "last_name")
        .map(([key, value]) => `${value}`)
        .join("\n");

      var spanElement = document.createElement('span');
      spanElement.id = 'lname';
      spanElement.textContent = formattedData;
      colDiv.appendChild(spanElement);

      // Format JSON data for display to h4 IDStudent
      formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "student_id")
        .map(([key, value]) => `Student ID : ${value}`)
        .join("\n");

      var h4Element = document.createElement('h4');
      h4Element.id = 'IDStudent';
      h4Element.textContent = formattedData;
      colDiv.appendChild(h4Element);

      // Format JSON data for display to h4 Umail
      formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "email")
        .map(([key, value]) => `Email : ${value}`)
        .join("\n");

      var h4Element = document.createElement('h4');
      h4Element.id = 'Umail';
      h4Element.textContent = formattedData;
      colDiv.appendChild(h4Element);

      // Format JSON data for display to h4 Act-Title
      formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "title")
        .map(([key, value]) => `Title : ${value}`)
        .join("\n");

      var h4Element = document.createElement('h4');
      h4Element.id = 'Act-Title';
      h4Element.textContent = formattedData;
      colDiv.appendChild(h4Element);

      // Format JSON data for display to h4 Act-Type
      formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "type_of_work_id")
        .map(([key, value]) => `Type of activity : ${value}`)
        .join("\n");

      var h4Element = document.createElement('h4');
      h4Element.id = 'Act-Type';
      h4Element.textContent = formattedData;
      colDiv.appendChild(h4Element);

      // Format JSON data for display to h4 Acd-Year
      formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "academic_year")
        .map(([key, value]) => `Acadamic year : ${value}`)
        .join("\n");

      var h4Element = document.createElement('h4');
      h4Element.id = 'Acd-Year';
      h4Element.textContent = formattedData;
      colDiv.appendChild(h4Element);

      // Format JSON data for display to h4 Sem
      formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "semester")
        .map(([key, value]) => `Semester : ${value}`)
        .join("\n");

      var h4Element = document.createElement('h4');
      h4Element.id = 'Sem';
      h4Element.textContent = formattedData;
      colDiv.appendChild(h4Element);

      // Format JSON data for display to h4 start-date
      formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "start_date")
        .map(([key, value]) => `Start date : ${value}`)
        .join("\n");

      var h4Element = document.createElement('h4');
      h4Element.id = 'start-date';
      h4Element.textContent = formattedData;
      colDiv.appendChild(h4Element);

      // Format JSON data for display to h4 end-date
      formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "end_date")
        .map(([key, value]) => `End date : ${value}`)
        .join("\n");

      var h4Element = document.createElement('h4');
      h4Element.id = 'end-date';
      h4Element.textContent = formattedData;
      colDiv.appendChild(h4Element);

      // Format JSON data for display to h4 place
      formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "location")
        .map(([key, value]) => `Location : ${value}`)
        .join("\n");

      var h4Element = document.createElement('h4');
      h4Element.id = 'place';
      h4Element.textContent = formattedData;
      colDiv.appendChild(h4Element);

      // Format JSON data for display to h4 place
      formattedData = Object.entries(responseData.data)
        .filter(([key, value]) => key === "description")
        .map(([key, value]) => `Description : ${value}`)
        .join("\n");

      var h4Element = document.createElement('h4');
      h4Element.id = 'comment';
      h4Element.textContent = formattedData;
      colDiv.appendChild(h4Element);

      // Append the column div to the row
      var row = document.getElementById('row');
      row.appendChild(colDiv);

      alert("submit success!!!");

      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      function uncheckbox() {
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
      }

      uncheckbox();

      document.getElementById("myForm").reset();
    } else {
      console.error("Failed to submit form data.");

      // Display error message
      alert("Failed to submit form data. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred while submitting form data:", error);
  }
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document
  .getElementById("studentID")
  .addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);


