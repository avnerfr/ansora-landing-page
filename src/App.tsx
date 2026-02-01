import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { BookDemo } from "@/pages/BookDemo";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book-a-demo" element={<BookDemo />} />
    </Routes>
  );
}

export default App;
