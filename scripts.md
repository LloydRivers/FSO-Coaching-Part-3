# FSO-Coaching-Part-3

## Available Scripts

In the project directory, you can run the following npm scripts:

| Script  | Description                                                                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build` | Removes the `build` directory and compiles TypeScript files to JavaScript using the TypeScript compiler (`tsc`).                                                    |
| `dev`   | Starts the development server using `nodemon`, which automatically restarts the server when changes are detected in the source files.                               |
| `start` | Builds the project using the `build` script and then starts the server by running the compiled JavaScript file (`index.js`) in the `build` directory using Node.js. |

### Usage

To use these scripts, run the following commands in your terminal:

#### `npm run build`

This script removes the existing `build` directory using `rimraf` and then compiles TypeScript files to JavaScript using `tsc`, generating the compiled JavaScript files in the `build` directory.

#### `npm run dev`

This script starts the development server using `nodemon`, which monitors changes in your source files and automatically restarts the server. This is useful for the development workflow as it provides automatic reloading.

#### `npm start`

This script first runs the `build` script to compile TypeScript files to JavaScript. Once the build process is complete, it starts the server by running the compiled JavaScript file (`index.js`) located in the `build` directory using Node.js.
