# jun25-task-tracker-frontend
Building the frontend project for task tracker API built during Express learning

Plan for today
- Design pages and layout
- Agree on the API contract (auth + tasks)
- Decide our React architecture
- Start scaffolding the UI

## 1. Pages and Layout

### 1.1 Global Layout
- Navbar
    - Shows app name/logo
    - Navigation links
        - Home (/)
        - Tasks (/tasks) - only useful when logged in
    - Auth area
        - When logged out: "Login" and "Register" links
        - When logged in: "Welcome, {email}" and a "Logout" button
        - If admin: show an "Admin" badge or label

- Main Content
    - Swaps between different pages using routing (React Router)
    - Pages:
        - Home (/)
        - Sign Up (/signup)
        - Login (/login)
        - Tasks list (/tasks) - protected
        - Task detail (/tasks/:id) - protected

- Footer
    - Simple text: App name, year, and a link to Github repos


### 1.2 `/` - Home
- Content
    - Heading "Task Tracker"
    - Subheading: short description, "Keep track of what you need to do"
    - Buttons:
        - Get started - /register
        - If already logged in, "Go to my tasks" - /tasks

### 1.3 `/signup` - Sign Up
- UI
    - Form fields
        - email (email)
        - password (string)
        - role ('user' | 'admin')
    
    - Button
        - "Create account"
    
    - Link
        - "Already have an account? Log In" - /login

- Behaviour
    - On submit, call POST /api/v1/auth/signup on the backend
    - On success, show the success message, send them to /login

### 1.4 `/login` - Login
- UI
    - Form fields
        - email (email)
        - password (string)
    - Button
        - "Log In"
    - Link
        - "Need an account? Sign Up - /signup
    
- Behaviour
    - On submit, call POST /api/v1/auth/login on the backend
    - On success   
        - Receive a JWT token: {token}
        - Decode/store auth info
        - Redirect to /tasks
    - On failure
        - Send an error message
            - error message
            - error name

### 1.5 `/tasks` - Tasks list (protected)
- Layout
    - Section: "Tasks"
        - Task cards, each card shows
            - Title
            - Status badge: ['todo (default)', 'in-progress', 'done']
            - Due Date (if provided)
            - TaskId (not displayed)
        - Actions
            - Click on the task to see details

    - Filters:
        - Buttons or dropdown: "All", "To Do", "In Progress", "Done"
        - For admins: Filter by user

- Behaviour
    - Protected route - only for authenticated users
    - On mount:
        - Call GET /api/v1/tasks
        - user: Only their tasks
        - admin: Tasks from all the users
    - On failure
        - Send an error message
            - error message
            - error name
        - Redirect to /login

### 1.6 `/tasks/:id` - Task detail (protected)
 - Behaviour
    - On mount: call GET /api/v1/tasks/:taskId

    - Backend:
        - admin - can view any task by id
        - user - can only view the tasks they have created; otherwise return 404
    
    - UI:
        - Show title, status, user(for admin), due date, timestamps
        - Later: Update/Delete buttons when backend supports it
    
    - On failure
        - Send an error message
            - error message
            - error name
        - Redirect to /tasks, or useNavigate(-1)

## Data Models (Frontend View)
- User
- Tasks

## Permissions and Rules
- User
- Admin

## API Contract (Request and Response body format)
Auth Routes
Task Routes

## Frontend Architecture
### Routes and layout

### AuthContext

### Tasks state

## Start Building
