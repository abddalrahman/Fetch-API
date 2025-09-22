# Fetch API

A two-page web application built using HTML, CSS, Bootstrap 5, and JavaScript, created on **June 28, 2025** as part of a front-end training exercise. The project simulates real-world API interaction by fetching articles and user names from live external APIs, then rendering and managing the content dynamically across a **Home** page and an **Article Details** page.

> ⚠️ **Note**: This project was built as a practical exercise to explore how front-end applications interact with external APIs. It focuses on dynamic data rendering, pagination, filtering, and user-driven sorting — all implemented with clean UI and responsive layout.

## 🧰 Technologies Used

- HTML5
- CSS3
  - Basic styling
  - No animations
- Bootstrap 5 (via CDN)
  - Grid system
- JavaScript
  - `fetch()` for API calls
  - DOM manipulation
  - String methods
  - Loop in Object

## 📄 Page Structure

- **Home Page**

  - Displays a list of articles fetched from a live API
  - Allows control over number of articles per page
  - Supports ascending/descending sorting
  - Includes search functionality (minimum 3 characters)
  - Implements pagination with forward/backward navigation

- **Article Page**
  - Displays full details of a selected article
  - Data loaded dynamically based on article ID

## 🧠 Functional Highlights

- **Live API Integration**

  - Fetches articles and user names from real external APIs
  - Displays content dynamically based on user interaction

- **Pagination System**

  - Navigate between pages using arrow controls
  - Load a new set of articles per page
  - Return to previous articles using back navigation

- **Content Control**

  - Choose how many articles to display per page
  - Sort articles in ascending or descending order
  - Search articles by keyword (minimum 3 characters required)

- **Article Details View**
  - Click on any article to view its full details
  - Data rendered dynamically from API response

## 🎨 Visual Features

- Responsive layout using Bootstrap grid
- Clean and minimal design for clarity and usability
- No animations used

## 📁 Project Structure

- index.html
- article.html
- README.md
- assets
  - css
    - main.css
  - js
    - main.js
    - article.js

## 🕰️ Project Timeline

- **Start Date**: June 28, 2025
- **Duration**: ~3 hours
- **Type**: Practical exercise

## 📌 Notes

This project was developed as a hands-on implementation of API consumption in front-end development. It demonstrates how to fetch, filter, sort, and paginate data from external sources using JavaScript. The layout was built with Bootstrap 5 to ensure responsiveness and reduce custom CSS.

## 🔗 Live Preview

View the project live here:

[Fetch API](https://abddalrahman.github.io/Fetch-API/)
