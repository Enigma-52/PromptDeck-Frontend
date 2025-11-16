import { Outlet } from "react-router-dom";
import "./globals.css";

// If you want Inter font like Next.js:
// import "@fontsource/inter/variable.css";

export default function RootLayout() {
  return (
    <div className="dark min-h-screen antialiased">
      <Outlet />
    </div>
  );
}
