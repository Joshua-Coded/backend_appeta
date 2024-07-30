# Appeta Food Delivery Platform Backend

This repository contains the backend code for the Appeta Food Delivery Platform. The backend is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the backend, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/backend_appeta.git
   cd backend_appeta
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

## Configuration

Before running the application, you need to configure the environment variables. Create a `.env` file in the root of your project and add the following variables:

```env
# MongoDB connection string
DATABASE_URL=mongodb://localhost:27017/appeta

# Port to run the server on
PORT=3000

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret
```

Make sure to replace `your_jwt_secret` with a secure string.

## Running the Application

To start the application, use the following command:

```sh
npm start
```

This will start the server on the port specified in the `.env` file.

## API Endpoints

The following endpoints are available in the Appeta backend:

### Authentication

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login a user

### Restaurants

- **GET /api/restaurants**: Get a list of all restaurants
- **POST /api/restaurants**: Add a new restaurant
- **GET /api/restaurants/:id**: Get a single restaurant by ID
- **PUT /api/restaurants/:id**: Update a restaurant by ID
- **DELETE /api/restaurants/:id**: Delete a restaurant by ID

### Orders

- **GET /api/orders**: Get a list of all orders
- **POST /api/orders**: Place a new order
- **GET /api/orders/:id**: Get a single order by ID
- **PUT /api/orders/:id**: Update an order by ID
- **DELETE /api/orders/:id**: Cancel an order by ID

### Users

- **GET /api/users**: Get a list of all users
- **GET /api/users/:id**: Get a single user by ID
- **PUT /api/users/:id**: Update a user by ID
- **DELETE /api/users/:id**: Delete a user by ID

## Contributing

We welcome contributions to the Appeta Food Delivery Platform backend! To contribute, follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**

   ```sh
   git checkout -b my-feature-branch
   ```

3. **Make your changes.**
4. **Commit your changes:**

   ```sh
   git commit -m 'Add new feature'
   ```

5. **Push to the branch:**

   ```sh
   git push origin my-feature-branch
   ```

6. **Submit a pull request.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
