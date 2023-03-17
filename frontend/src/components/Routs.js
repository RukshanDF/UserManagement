import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEditUser from "./gateways/AddEditUser";
import Users from "./gateways/Users";
function Routs() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="add_user" element={<AddEditUser />} />
          <Route path="edit_user/:id" element={<AddEditUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routs;
