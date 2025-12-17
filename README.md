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

## 2. Data Models (Frontend View)
### User
```
{
    id: string; // Mongo _id
    email: string;
    role: "user" | "admin";
    // password: NEVER sent back to frontend
}
```
### Tasks
```
{
    id: string; // _id
    user: string; // owner userId
    title: string;
    status: "todo" | "in_progress" | "done";
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
}
```

## 3. Permissions and Rules
- User
    - Create tasks.
    - List their own tasks (GET /tasks).
    - View their own tasks (GET /tasks/:id).

- Admin
    - All of the above.
    - List all tasks (GET /tasks).
    - View any task by id (GET /tasks/:id).


## 4. API Contract (Request and Response body format)
### Auth Routes
- POST `/auth/signup`
    - Body: `{ "email": string, "password": string, "role": "user" | "admin" }`
    - Response (201):
    `{ "message": "User registered" }`

- POST `/auth/login`
    - Body: `{ "email": string, "password": string }`
    - Response (200): `{ "token": string }`
    - Token payload (decoded JWT): `{ "userId": string, "role": "user" | "admin", "iat": number, "exp": number }`

- Protected routes:
    - Require header:
        - Authorization: Bearer `<token>`

### Task Routes
- GET `/tasks`
    - Auth: required.
    - Backend:
        - admin → all tasks.
        - user → tasks where user === userId from token.
    - Response:
        - Array of Task objects sorted by dueDate ascending.

- POST `/tasks`
    - Auth: required.
    - Body:
    `{ "title": string, "status"?: string, "dueDate"?: string }`
    - Response (201): `{ "message": "New Task added.", "body": Task }`

- GET `/tasks/:id`
    - Auth: required.
    - Response:
        - `200`: Task object if user has access.
        - `404`: `{ "error": "Task not found" }` if not found or not owned.

## 5. Frontend Architecture
### Routes and layout

#### Routes
- `"/" ` -  `<App />`
- `"/register"` - `<Register />`
- `"/login"` - `<Login />`
- `"/tasks"` - `<TasksPage />`   (protected)
- `"/tasks/:id"` - `<TaskDetailPage />` (protected)

#### Layout
##### AuthContext
AuthContext state:
```
{
    userId: string | null;
    role: "user" | "admin" | null;
    token: string | null;
    isAuthenticated: boolean;
}
```
Methods:
- `login(credentials)`:
- Calls POST /auth/login.
- Stores token and decoded { userId, role }
- `logout()`:
- Clears token and auth state.
  
All protected API calls read token from AuthContext and send `Authorization: Bearer <token>`.

##### Tasks state
Tasks state (initially local to pages):

- tasks: `Task[]`
- isLoading: `boolean`
- error: `string | null`
- filters: `{ status: string }`

Methods:
- `loadTasks()` → GET /tasks
- `createTask()` → POST /tasks
- Later: `updateTaskStatus()`, `deleteTask()` when backend routes exist.

## Start Building
Now we work on Project Development