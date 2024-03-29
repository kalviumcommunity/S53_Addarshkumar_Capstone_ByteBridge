import Homepage from "./components/Homepage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import {Routes,Route} from "react-router-dom"
import Loginpage from "./components/Loginpage"
import Signuppage from "./components/Signuppage"

function App() {

  return (
    <>
     <Navbar />
     <Routes>
     <Route path="/" element={<Homepage />} />
     <Route path="/login" element={<Loginpage />} />
     <Route path="/signup" element={<Signuppage />} />

     </Routes>
     <Footer />
    </>
  )
}

export default App
