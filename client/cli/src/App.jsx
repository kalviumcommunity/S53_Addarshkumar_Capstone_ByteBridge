import Homepage from "./components/Homepage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import {Routes,Route} from "react-router-dom"
import Loginpage from "./components/Loginpage"
import Signuppage from "./components/Signuppage"
import Phonesignin from "./components/Phonesignin"
import Questionpage from "./components/Questionpage"
import Answerpage from "./components/Answerpage"
function App() {


  return (
    <>
     <Navbar />
     <Routes>
     <Route path="/" element={<Homepage />} />
     <Route path="/login" element={<Loginpage />} />
     <Route path="/signup" element={<Signuppage />} />
     <Route path="/phonelogin" element={<Phonesignin />} />
     <Route path="/questionpage" element={<Questionpage />} />
     <Route path="/answerpage/:id" element={<Answerpage />} />
     </Routes>
     <Footer />
    </>
  )
}

export default App
