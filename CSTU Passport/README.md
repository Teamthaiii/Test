# CSTU Passport

Welcome to CSTU Passport, a web-based form designed to create a comprehensive record of computer science students' activities and achievements. This project aims to collect and organize data from computer science students to create personalized passports for each student. The passport will summarize their works, projects, competitions, research, and sports activities throughout their academic journey. Through CSTU Passport, students can showcase their diverse experiences and accomplishments in computer science.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Validation Methods](#validation-methods)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

## Introduction

CSTU Passport is a simple web form designed to collect data from university students and computer science enthusiasts. It allows users to submit information about their works, activities, and achievements, including their full name, student ID, email, activity type, start and end dates, location, and description.

## Features

- Collects user's first name and last name.
- Validates the student ID to ensure it is a 10-digit number.
- Verifies the university email format to match "xxx.yyy@dome.tu.ac.th".
- Offers a selection of activity types suitable for both students and computer science enthusiasts.
- Collects the start date and end date for the user's work or activity.
- Provides an input field to specify the location of the work or activity.
- Allows users to provide a detailed description of their work or activity.
- Custom JavaScript validation to ensure data integrity.

## Validation Methods

This project demonstrates three different methods of data validation:

1. **Validation with HTML5 (Frontend):** In the "validation with html5" folder, the form uses HTML5 form validation attributes like `required`, `type="email"`, etc., to perform basic client-side validation. This method leverages built-in browser validation features.

2. **Validation with JavaScript (Frontend):** In the "validation with js" folder, the form utilizes a custom JavaScript script (`script.js`) to implement more complex frontend validation. It validates that the first name and last name are separated by a space, the email follows the "xxx.yyy@dome.tu.ac.th" format, the student ID has 10 digits, and the end date/time is after the start date/time.

3. **Validation with Backend (Server-side):** In the "validation with backend" folder, the form includes server-side validation using backend code. Similar to the frontend JavaScript validation, it also validates the start and end date/time based on the selected Academic Year and Semester.

## Getting Started

To get started with CSTU Passport, follow these steps:

1. Clone the repository: `git clone https://github.com/BrightBct/66-1_cs100_cstu_passport.git`
2. Navigate to the project directory: `cd 66-1_cs100_cstu_passport`

## Usage

1. Choose the validation method you want to explore: "validation with html5," "validation with js," or "validation with backend."
2. Open the respective `index.html` file in your web browser.
3. Fill out the form with the required information.
4. Click the "Submit" button to submit your data.
5. The chosen validation method will perform validation on the data before submission.

## License

This project is licensed under the [MIT License](LICENSE).
