import { Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import "./index.css";
import Home from "./routes/Home";
import About from "./routes/About";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}
