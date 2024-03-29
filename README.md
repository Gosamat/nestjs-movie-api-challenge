# NestJS Movie API Backend Code Challenge

This project is a RESTful API built with NestJS, a powerful Node.js framework using TypeScript. The API allows users to manage movies and genres in a database, providing functionalities for listing, adding, updating, and deleting movies and genres, as well as searching for movies by title or genre.

## Requirements

To run this API, you'll need:

- NestJS framework
- TypeScript
- SQL database (such as PostgreSQL, MySQL, etc.)
- Zod schema validation

## Features

### Movies

- **List Movies**: View all movies stored in the database.
- **Add Movie**: Add a new movie with details like title, description, release date, and genre(s).
- **Update Movie**: Modify the details of a specific movie.
- **Delete Movie**: Remove a movie from the database.
- **Search Movies**: Find movies based on title or genre.

### Genres

- **List Genres**: See all available genres.
- **Add Genre**: Include a new genre in the database.
- **Delete Genre**: Remove a genre, along with its association from movies.

## Bonus Tasks

- **Pagination**: Implemented pagination for better handling of movie lists.
- **Middleware for Request Logging**: Added logging for incoming requests, visible in terminal.
- **Data Validation and Error Handling**: Ensured data validation via Zod and comprehensive error handling.

## How to Run

Follow these steps to get the API up and running:

1. **Clone the repository:**

   ```bash
   git clone git@github.com:Gosamat/nestjs-movie-api-challenge.git
   ```

2. **Install dependencies:**

   ```bash
   cd nestjs-movie-api
   npm install
   ```

3. **Set up your database connection:**

   Create a `.env` file in the root directory and specify the following variables:

   ```dotenv
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=test
   DB_PASSWORD=test
   DB_DATABASE=moviesApi
   ```

   Make sure to replace the values with your actual database credentials.

4. **Run the application:**

   ```bash
   npm run start:dev
   ```

   With the environment variables properly set up, the application will be able to connect and run smoothly.

## API Endpoints

### Movies

- **GET /movies**: List all movies.
  - **Parameters**: None
- **POST /movies**: Add a new movie.
  - **Body Parameters**:
    - Title (String, required)
    - Description (String, required)
    - Release date (Date, required)
    - Genre(s) (Array of Strings, required)
- **PATCH /movies/:id**: Update a movie by ID.
  - **Parameters**:
    - ID (String, required)
    - Updated movie details (Object, required)
- **DELETE /movies/:id**: Delete a movie by ID.
  - **Parameters**:
    - ID (String, required)
- **GET /movies/search**: Search movies by title or genre.
  - **Query Parameters**:
    - Title (String, optional)
    - Genre (String, optional)

### Genres

- **GET /genres**: List all genres.
  - **Parameters**: None
- **POST /genres**: Add a new genre via body.
  - **Body Parameters**:
    - Name (String, required)
- **DELETE /genres/:id**: Delete a genre by ID.
  - **Parameters**:
    - ID (String, required)

## Testing the API

You can test the API endpoints using Postman or any other API testing tool. Additionally, Swagger UI is implemented so you can explore the API via http://localhost:3000/api.

## Postman Collection

In the root directory of this project, there is also a Postman collection file for testing the API endpoints in `postman`.

## License

This project is licensed under the [MIT License](LICENSE).
