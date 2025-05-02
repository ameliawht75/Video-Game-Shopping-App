import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Root() {

  return (
    <>
   <Header />
      <Outlet />
    <Footer />
    </>
  )
}
