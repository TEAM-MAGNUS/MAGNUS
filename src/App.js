import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
