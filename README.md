This website allows users to create, manage, and track their fitness goals in a simple way. User Authentication: Secure login and registration using JWT (JSON Web Tokens) with password hashing via bcrypt.
Fitness Goal Management:
Creating new fitness goals with details like title, type (e.g., weight loss, running, strength), target value, starting value, units, and deadline.
Editing existing goals, including updating progress and toggling active/inactive status.
Deleting goals as needed. Goal Filtering: Filter goals on the main page to show only active goals.
Home Page: A minimal landing page that greets the user (e.g., "Welcome, [username]!" or "Welcome, Guest!") with a button to create a new fitness goal. So, the dependencied you need to download are: express ejs bcrypt dotenv body-parser jsonwebtoken. Project Structure: 
Routes: Organized into goalRoutes.js (for goal-related routes like /goals, /goals/new) and authRoutes.js (for authentication routes like /login, /register, /logout).
Controllers: Separated into goalController.js (handles goal-related logic like creating, editing, and deleting goals) and authController.js (manages authentication logic like login, registration, and logout).
Services: Include goalService.js (manages goal data operations, e.g., reading/writing to goals.json) and authService.js (handles user data operations, e.g., reading/writing to users.json).
Views: EJS templates in views/ for rendering pages (goals/, auth/, home.ejs), with a partials/ folder for reusable components like the header.
Static Files: CSS styles in public/css/styles.css for consistent theming across the app.

https://github.com/artem0237/fitnessApp - Github repo link
https://fitnessapp-jyw9.onrender.com - The link to public version of website
