# Contact Management App

## Overview

The Contact Management App is a web application built with React, TypeScript, Redux, and various modern libraries. It provides functionality for managing contacts, visualizing data with charts, and viewing geographic data on a map.

## Running the Application

1. **Clone the repository:**

    ```sh
    git clone https://github.com/nrvpanchani/contact-management-app.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd contact-management-app
    ```

3. **Install dependencies:**

    ```sh
    npm install
    ```

4. **Start the application:**

    ```sh
    npm start
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints Used

- **Worldwide Data:** `https://disease.sh/v3/covid-19/all`
- **Country Specific Data:** `https://disease.sh/v3/covid-19/countries`
- **Historical Data:** `https://disease.sh/v3/covid-19/historical/all?lastdays=all`

## Scripts

- `start`: Starts the development server.
- `build`: Builds the application for production.
- `test`: Runs the tests.
- `eject`: Ejects the configuration for customization.

## Configuration

### ESLint

The project uses ESLint for code linting. Configuration is provided in the `eslintConfig` section of `package.json`.

### Browserslist

The Browserslist configuration determines which browsers are supported. Adjust this configuration based on your project's needs.

### Tailwind CSS

Tailwind CSS is used for styling. Configuration is located in `tailwind.config.js` and `postcss.config.js`.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes.
4. Open a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).
