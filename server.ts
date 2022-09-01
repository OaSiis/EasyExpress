import app, { SERVER_PORT } from "./src/app";

app.listen(SERVER_PORT, () => console.log(`The server is running on port ${SERVER_PORT}`));
