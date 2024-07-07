import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllCountries from "./components/AllCountries";
import LayoutApp from "./components/Layout";
import SinglePageApp from "./components/SinglePageApp";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutApp />}>
          <Route index element={<AllCountries />} />
          <Route path="/country/:id" element={<SinglePageApp />} />
        </Route>
        <Route path="*" element={<AllCountries />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
