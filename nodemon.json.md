## Nodemon Configuration

The `nodemon.json` file is a configuration file used by Nodemon, a utility that monitors changes in your Node.js applications and automatically restarts the server when changes are detected. Below is an explanation of the configuration options:

```json
{
  "watch": ["src"],
  "ext": ".ts .js .html .css",
  "ignore": ["node_modules"],
  "exec": "ts-node ./src/index.ts"
}
```

### Configuration Options

| Option   | Description                                                                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`  | Specifies the directories to watch for file changes. In this example, Nodemon will watch the `src` directory for changes in source files.                               |
| `ext`    | Specifies the file extensions to watch. If changes are detected in files with these extensions, Nodemon will automatically restart the server.                          |
| `ignore` | Specifies directories or files to ignore. In this example, Nodemon will ignore changes in the `node_modules` directory, preventing unnecessary restarts.                |
| `exec`   | Specifies the command to execute when changes are detected. In this example, Nodemon will execute `ts-node ./src/index.ts` to start the server with TypeScript support. |

### Usage

To use this Nodemon configuration, create a `nodemon.json` file in the root directory of your project and add the configuration options as shown above. Customize the options based on your project's specific requirements.
