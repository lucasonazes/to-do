# To-Do Task Management Frontend

This is a React-based frontend for a task management application. It allows users to create, edit, and manage tasks, projects, tags, and users.

## Features

- Create, edit, and delete tasks
- Assign tasks to users, projects, and tags
- Filter and search tasks by user, project, tag, and status
- Manage users, projects, and tags
- Responsive and user-friendly interface

## Technologies Used

- React
- TypeScript
- Axios (for API requests)
- React Router DOM (for navigation)
- React Hot Toast (for notifications)
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd to-do
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### API

This frontend expects a backend API running at `http://localhost:5000`. Make sure the backend is running and accessible.

## Project Structure

```
src/
  App.tsx
  GlobalStyles.css
  index.tsx
  Models/
    Project.ts
    Tag.ts
    Task.ts
    User.ts
  Pages/
    CreateProject.tsx
    CreateTag.tsx
    CreateTask.tsx
    CreateUser.tsx
    EditProject.tsx
    EditTag.tsx
    EditTask.tsx
    EditUser.tsx
    Home.tsx
    ListProjects.tsx
    ListTags.tsx
    ListTasks.tsx
    ListUsers.tsx
```

## License

This project is licensed under the MIT License.
