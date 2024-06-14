import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Footer from "./components/Footer";
import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import PrivateComponent from "./components/PrivateComponent";
import LogIn from "./components/LogIn";
import AddProduct from "./components/AddProduct";
import "./index.css"
import EditProduct from "./components/EditProduct";
import NotFoundPage from "./components/404Page";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        {/*................... Private routes.................. */}
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/update-product/:id" element={<EditProduct/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path='*' exact={true} element={<NotFoundPage/>} />
        </Route>

        {/*................... Public routes.................. */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
