# **To-Do List App**

### This To-do List App helps you manage your tasks efficiently. Whether you need to organize your work assignments, plan personal projects, or simply keep track of your daily activities, this app provides a comprehensive task management system with additional features to enhance your productivity.

## **Tech Stack**

### App is built using the following technologies:

- [Next.Js](https://nextjs.org/) - a framework for building server-rendered React applications

- [TailWind CSS](https://tailwindcss.com/) - a utility-first CSS framework
- [Prisma](https://www.prisma.io/) - open-source ORM that simplifies database access and saves repetitive CRUD boilerplate.
- [Postgres](https://www.postgresql.org/) -  object-relational SQL database



# **Frontend**

### 

## *User Authentication*

### Account registration: Users can register for an account using Google login.

### Next-auth integration: Authentication is implemented using **next-auth**, ensuring secure and reliable user authentication.

### Account management: Once registered, users can log in and log out of their account. They can also access a history of their tasks to review their progress.

## *UI/UX*

### Clean and user-friendly interface: The application features a visually appealing and intuitive design that enhances the user experience.

### Tailwind CSS library: The app is built using **Tailwind CSS**, a powerful design library, to provide a consistent and responsive interface across desktop and mobile devices.

![Responsive Design](/readme_assests/resp.jpg "Responsive Design")

## *Task Management*

### Create, view, update, and delete tasks: Users can easily create new tasks, view existing tasks, update task details, and delete completed or unnecessary tasks.

### Task attributes: Each task includes a title, description, due date, color, status and a field to record the number of "tomatoes" spent on that task. "Tomatoes" represent a unit of time (usually 25 minutes) using the Pomodoro Technique.

---

![Home Page](/readme_assests/todolist-hl.jpg "HomePage")


### *Creating and Updating Task*

![Create Task](/readme_assests/todolist-1.jpg "Create Task")

![Update Task](/readme_assests/todolist-1m.jpg "Update Task")

## Pomodoro Timer

### Efficient work sessions: The app includes a Pomodoro timer to help users manage their time effectively. Each work session lasts for 25 minutes, followed by a 5-minute break session.

### Tomatoes: After completing a session a tomato is earned

### Longer breaks: After completing four Pomodoro sessions, a longer break session of 15-30 minutes is triggered to provide a refreshing pause.

![Pomodoro Timer](/readme_assests/todolist-2.jpg "Pomodoro Timer")


## Analytics Dashboard

### Visualizations and metrics: The app offers an analytics dashboard to provide insights into task completion data.

### Charts and data visualizations: The dashboard includes pie-chart and calendar showing pending tasks.


![Dashboard Page](/readme_assests/todolist-dashl.jpg "Dashboard Page")

---

# Backend

## Data Storage

### Tasks: The backend stores task data, including their titles, descriptions, due dates, status, color and time spent on each task.

### User Accounts: User authentication data, such as usernames, passwords, and account information, is securely stored.

## User Authentication

### Account Registration: Users can register for an account by providing their username, password, and other required details.

### Google Login: Users can log in to the To-do List App using their Google accounts.

### User Registration: New users can register for an account by authenticating with Google.

## API Endpoints

### The backend exposes the following API endpoints for interaction with the To-do List App:

### Task Management: Endpoints for creating, reading, updating, and deleting tasks in the user's to-do list.

### User Authentication: Endpoints for user registration, login, and logout operations.
