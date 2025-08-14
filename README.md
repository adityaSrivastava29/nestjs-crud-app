# NestJS CRUD Application

This is a basic CRUD (Create, Read, Update, Delete) application built with NestJS, TypeORM, and PostgreSQL. It demonstrates how to build a RESTful API for managing user data.

## Features

*   **User Management:**
    *   Create new users.
    *   Retrieve all users.
    *   Retrieve a single user by ID.
    *   Update existing users.
    *   Delete users.
*   **Database Integration:** Uses TypeORM as an ORM for interacting with a PostgreSQL database.
*   **Modular Structure:** Organized into modules for better maintainability and scalability.

## Technologies Used

*   **[NestJS](https://nestjs.com/):** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
*   **[TypeORM](https://typeorm.io/):** An ORM (Object Relational Mapper) that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
*   **[PostgreSQL](https://www.postgresql.org/):** A powerful, open-source object-relational database system.
*   **[TypeScript](https://www.typescriptlang.org/):** A superset of JavaScript that adds static typing.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** (LTS version recommended)
*   **npm** or **Yarn** (npm is used in this README)
*   **PostgreSQL:** A running PostgreSQL instance.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd nestjs-crud-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the root of the project and add your PostgreSQL database connection details.

    ```
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_USER=your_username
    POSTGRES_PASSWORD=your_password
    POSTGRES_DATABASE=nest_crud_db
    PORT=3000
    MODE=DEV
    RUN_MIGRATIONS=true
    ```
    *Replace `your_username`, `your_password`, and `nest_crud_db` with your actual PostgreSQL credentials and desired database name.*

## Database Setup

This application uses PostgreSQL. You need to create the database and the `users` table manually, as `synchronize` is set to `false` in the TypeORM configuration (which is recommended for production environments).

1.  **Connect to your PostgreSQL server** (e.g., using `psql` or a GUI tool like DBeaver/pgAdmin).

2.  **Create the database:**

    ```sql
    CREATE DATABASE nest_crud_db;
    ```
    *(Use the database name you specified in your `.env` file)*

3.  **Connect to the newly created database:**

    ```sql
    \c nest_crud_db;
    ```

4.  **Create the `users` table:**

    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        "fullName" character varying NOT NULL,
        email character varying NOT NULL UNIQUE
    );
    ```

## Running the Application

1.  **Start the application in development mode (with watch):**

    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

2.  **Start the application in production mode:**

    ```bash
    npm run build
    npm run start:prod
    ```

## API Endpoints

All endpoints are prefixed with `/users`.

### 1. Create a User

*   **URL:** `/users`
*   **Method:** `POST`
*   **Body (JSON):**
    ```json
    {
        "fullName": "Aditya",
        "email": "aditya@example.com"
    }
    ```
*   **Success Response:**
    *   **Code:** `201 Created`
    *   **Content:**
        ```json
        {
            "success": true,
            "message": "User Created Successfully"
        }
        ```
*   **Error Response:**
    *   **Code:** `400 Bad Request` (e.g., if email already exists or validation fails)
    *   **Content:**
        ```json
        {
            "success": false,
            "message": "Error message details"
        }
        ```

### 2. Get All Users

*   **URL:** `/users`
*   **Method:** `GET`
*   **Success Response:**
    *   **Code:** `200 OK`
    *   **Content:**
        ```json
        {
            "success": true,
            "data": [
                {
                    "id": 1,
                    "fullName": "Aditya",
                    "email": "aditya@example.com"
                },
                {
                    "id": 2,
                    "fullName": "Jane Smith",
                    "email": "jane.smith@example.com"
                }
            ],
            "message": "User Fetched Successfully"
        }
        ```

### 3. Get User by ID

*   **URL:** `/users/:id` (e.g., `/users/1`)
*   **Method:** `GET`
*   **Success Response:**
    *   **Code:** `200 OK`
    *   **Content:**
        ```json
        {
            "success": true,
            "data": {
                "id": 1,
                "fullName": "Aditya",
                "email": "aditya@example.com"
            },
            "message": "User Fetched Successfully"
        }
        ```
*   **Error Response:**
    *   **Code:** `404 Not Found`
    *   **Content:**
        ```json
        {
            "success": false,
            "message": "User Not Found"
        }
        ```

### 4. Update a User

*   **URL:** `/users/:id` (e.g., `/users/1`)
*   **Method:** `PATCH`
*   **Body (JSON):**
    ```json
    {
        "fullName": "Johnathan Doe",
        "email": "johnathan.doe@example.com"
    }
    ```
*   **Success Response:**
    *   **Code:** `200 OK`
    *   **Content:**
        ```json
        {
            "success": true,
            "message": "User Updated Successfully"
        }
        ```
*   **Error Response:**
    *   **Code:** `404 Not Found` or `400 Bad Request`
    *   **Content:**
        ```json
        {
            "success": false,
            "message": "Error message details"
        }
        ```

### 5. Delete a User

*   **URL:** `/users/:id` (e.g., `/users/1`)
*   **Method:** `DELETE`
*   **Success Response:**
    *   **Code:** `200 OK`
    *   **Content:**
        ```json
        {
            "success": true,
            "message": "User Deleted Successfully"
        }
        ```
*   **Error Response:**
    *   **Code:** `404 Not Found`
    *   **Content:**
        ```json
        {
            "success": false,
            "message": "User Not Found"
        }
        ```

## NestJS Core Concepts Explained

NestJS is a powerful and flexible framework for building scalable Node.js server-side applications. It's built with TypeScript and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

### 1. Modules

*   **Purpose:** Modules are fundamental building blocks in NestJS. They are classes annotated with `@Module()` decorator. Modules organize application structure by grouping related components (controllers, services, providers, etc.).
*   **How they work:** Each NestJS application has at least one root module (`AppModule`), which serves as the starting point. Modules can import other modules to use their exported providers, and they can export their own providers to be used by other modules. This creates a clear dependency graph and promotes modularity.
*   **Example:** `UserModule` groups `UserController` and `UserService`, along with the `User` entity, making it a self-contained unit for user-related functionalities.

### 2. Controllers

*   **Purpose:** Controllers are responsible for handling incoming requests and returning responses to the client. They define the application's API endpoints (routes).
*   **How they work:** Controllers are classes annotated with `@Controller()` decorator. They use HTTP method decorators like `@Get()`, `@Post()`, `@Put()`, `@Patch()`, `@Delete()` to map specific HTTP requests to handler methods.
*   **Routes:** A route defines the path and HTTP method that a client can use to access a specific resource or perform an action. For example, `@Get('/users')` maps to a GET request on the `/users` endpoint. `@Param()` decorator is used to extract dynamic values from the URL (e.g., `id` in `/users/:id`).
*   **Example:** `UserController` handles requests to `/users` and its sub-routes, delegating the business logic to `UserService`.

### 3. Services (Providers)

*   **Purpose:** Services (or more generally, Providers in NestJS) are plain TypeScript classes responsible for encapsulating business logic, interacting with databases, and performing other data-related operations. They are designed to be injected into controllers or other services.
*   **How they work:** Services are typically annotated with `@Injectable()` decorator, making them available for NestJS's Dependency Injection system. They abstract away complex logic from controllers, keeping controllers lean and focused on request handling.
*   **Example:** `UserService` contains the logic for creating, finding, updating, and deleting users, interacting directly with the TypeORM `Repository`.

### 4. Entities & DTOs (Data Transfer Objects)

*   **Entities:** Represent the structure of data stored in the database. In this application, `User` is an entity that maps to the `users` table in PostgreSQL. TypeORM decorators (`@Entity()`, `@PrimaryGeneratedColumn()`, `@Column()`) are used to define the schema.
*   **DTOs (Data Transfer Objects):** Are classes that define the shape of data being sent over the network (e.g., from client to server in a request body, or from server to client in a response). They are used for validation and to ensure that the data conforms to a specific structure. `CreateUserDto` and `UpdateUserDto` are examples of DTOs used for validating incoming user data.

### 5. Dependency Injection (DI)

*   **Concept:** Dependency Injection is a design pattern where components receive their dependencies from an external source rather than creating them themselves. This promotes loose coupling and makes code more testable and maintainable.
*   **In NestJS:** NestJS has a powerful built-in DI system. When a class (e.g., `UserController`) needs another class (e.g., `UserService`), it declares it in its constructor. NestJS's IoC (Inversion of Control) container automatically resolves and provides the necessary instance.

### 6. MVC Architecture in NestJS (Conceptual)

While NestJS is not a strict MVC (Model-View-Controller) framework in the traditional sense (especially for API-only applications that don't render views), it adopts similar principles:

*   **Model (M):** In NestJS, the "Model" can be conceptually represented by **Entities** (like `User`) and the **Services** that interact with these entities and encapsulate business logic (e.g., `UserService`). The service layer is where data manipulation and business rules reside.
*   **View (V):** For API-only applications, there isn't a "View" in the traditional sense (HTML templates). The "View" is implicitly the JSON (or other data format) response sent back to the client. The client-side application (e.g., a React or Angular frontend) would then render this data.
*   **Controller (C):** **Controllers** in NestJS directly fulfill the role of the Controller in MVC. They receive requests, interact with the "Model" (services) to process data, and then prepare the response to be sent back.

So, while not a direct MVC implementation, NestJS's architecture with Controllers, Services, and Entities provides a clear separation of concerns that aligns well with the spirit of MVC, promoting organized and maintainable codebases.

## Testing

*   **Unit Tests:**
    ```bash
    npm run test
    ```
*   **End-to-End Tests:**
    ```bash
    npm run test:e2e
    ```
