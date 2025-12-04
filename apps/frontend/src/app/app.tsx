// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import NxWelcome from "./nx-welcome";

import { Route, Routes, Link } from "react-router-dom";
import { Button } from "@my-app/components";
import { useCounter } from "@my-app/hooks";
import type { User } from "@my-app/types";

export function App() {
  const { count, increment } = useCounter(0);

  // Example of using the User type
  const user: User = {
    id: "1",
    name: "Test User",
    email: "test@example.com",
  };

  return (
    <div>
      <div className="p-4 bg-gray-100 mb-4">
        <h2 className="text-xl font-bold mb-2">Testing Shared Libraries</h2>
        <p>Counter: {count}</p>
        <Button label="Increment" onClick={increment} />
        <p className="mt-2">
          User: {user.name} ({user.email})
        </p>
      </div>

      <NxWelcome title="@my-app/frontend" />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{" "}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
