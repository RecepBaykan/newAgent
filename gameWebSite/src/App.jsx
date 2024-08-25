import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "../component/Home";
import IndexAlpha from "../component/PlayAlphaTest/IndexAlpha";
import Register from "../component/PlayAlphaTest/Register";
import Admin from "../component/AdminPanel/Admin";


function App() {
  
  return (
    <>
        
  

        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/playAlphaTest" element={<IndexAlpha/>} />
          <Route path="/RegisterAlpha" element={<Register/>} />
          <Route path="/admin/*" element={<Admin/>}/>
          
          
          
        </Routes>
       
        </BrowserRouter>

        
   

    </>
  )

/*
  return (
    <>
      <BrowserRouter>
        <AdminHeader />
        <Routes>
          <Route path="/" element={<Admin/>}/>
          <Route path="/update:id" element={<AddUpdateAgent/>} />
          <Route path="/add" element={<AddUpdateAgent/>} />
        </Routes>

        
      </BrowserRouter>
    </>
  );*/
}
export default App;
