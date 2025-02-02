# Movie & TV Show API

## Description
This is a RESTful API built with Node.js 20+ that provides authentication via JWT and allows users to manage movies, TV shows, actors, and directors. The API supports token refreshing, retrieving movies with filtering and sorting, fetching detailed episode information, and adding new entities.

## Features
- JWT-based authentication (including token refresh endpoint)
- Retrieve movies with filtering and sorting
- Retrieve detailed episode information (including director details)
- Add new entities

## Requirements
- Node.js 20+
- MySQL database

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and provide the necessary database and JWT settings:
   ```env
        PORT=
        PASSWORD_DB=
        NAME_DB=
        HOST_DB=
        USER_DB=
        PORT_MYSQL=
        NODE_ENV=dev
        LOCAL_HOST=
        PRIVATE_KEY= 
        PRIVATE_KEY_REFRESH= 
   ```

## Running the API

development mode:
```sh
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/login` - Authenticate and receive a JWT token.
- `POST /api/v1/refresh` - Refresh access token.
- `POST /api/v1/register` - This endpoint is used to register a new user in the system.
- `POST/api/v1/logout` - This endpoint is used to log out the current user..

### Movies
- `GET /api/v1/movies` - Retrieve movies (supports filtering & sorting).

### Episodes
- `GET /api/v1/episodes/:episodeId` - Retrieve an episode’s details, including its director.

### Entity

- `GET /api/v1/movies?genre=action` - filter by gender.
- `GET /api/v1/movies?orderDirection=asc` -  sort in ascending order.
- `GET /api/v1/movies?genre=suspense&orderDirection=desc` -  sort and filter.
- `GET /api/v1/movies?orderDirection=asc` -  sort in ascending order.
- `POST /api/v1/directors` -  allows you to create a director.
- `GET /api/v1/movies?orderDirection=asc` -  sort in ascending order.

## Notes
- Ensure your MySQL database is running before starting the server.
- API responses follow standard JSON format.
- Authentication is required for most endpoints.

## License
This project is licensed under the MIT License.

