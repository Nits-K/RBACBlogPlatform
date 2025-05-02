# BlogVillage - Role based Blog Application

BlogVillage is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to view and manage blogs with user authentication (JWT), and also provides an admin panel for managing the blogs.

## Features:

* User Authentication (JWT)
* Admin Dashboard
* User Profile Management
* Blog Management (CRUD Operations)
* Responsive Design (Mobile and Desktop Views)
* File Upload (Cloudinary)

---

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Nits-K/RBACBlogPlatform.git
cd RBACBlogPlatform
```

### 2. Set Up Backend (Node.js & Express)

1. Navigate to the `backend` folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables by creating a `.env` file:

```env
PORT=8000
MONGODB_URL=mongodb+srv://kantnitin:kantnitin3009@cluster0.ynvwgaw.mongodb.net/blogPlatform
ACCESS_TOKEN_SECRET=GbR9XTEFX1qXlB2ygdFOgpKWrhvRQMdEzh0RM97iVQdgqokG0Md1zRJ8R6P1A05t
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_SECRET=vh25rkbMfb470FcaMEaZAsdCkkPSVQBq72h74C2ArFJXmeKdWiEY9lciB1xi73cm
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=dko1iveis
CLOUDINARY_API_KEY=815215329187232
CLOUDINARY_API_SECRET=f9kuKf3iXSteBzCtJZccMybpEQg
```

4. Run the backend server:

```bash
npm run dev
```

* The backend server will now run on `http://localhost:8000`.

### 3. Set Up Frontend (React)

1. Navigate to the `frontend` folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

4. Run the frontend server:

```bash
npm run dev
```

* The frontend server will now run on `http://localhost:5173`.

---

## Usage

1. Once both the backend and frontend are running, open your browser and navigate to `http://localhost:5173` to access the application.
2. Sign up or log in to access the user dashboard.
3. If you're an admin, you can manage blogs from the admin panel at `/admin`.
4. For the user, you can view blogs and manage your profile.

---

## Available Scripts

In the frontend (React app), you can run the following commands:

* `npm start`: Starts the development server.
* `npm run build`: Builds the app for production.

In the backend (Node.js app), you can run:

* `npm run dev`: Starts the server with `nodemon` (for development mode).
* `npm run start`: Starts the server in production mode.


## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make changes, and create a pull request with your improvements. Please ensure that your code adheres to the following:

* Write clear and concise commit messages.
* Follow the existing code style (e.g., indentation, naming conventions).
* Ensure all tests pass.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Cloudinary](https://cloudinary.com/) for image uploading.
* [JWT.io](https://jwt.io/) for JSON Web Token authentication

