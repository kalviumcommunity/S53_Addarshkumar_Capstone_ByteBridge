import Homepage from "./components/Homepage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import {Routes,Route} from "react-router-dom"
import Loginpage from "./components/Loginpage"
import Signuppage from "./components/Signuppage"
import Phonesignin from "./components/Phonesignin"
import Questionpage from "./components/Questionpage"
import Answerpage from "./components/Answerpage"
import Profilepage from "./components/Profilepage"
import Blogpage from "./components/Blogpage"
import BlogPostpage from "./components/Blogpostpage"
import Leaderboard from "./components/Leaderboard"
import Adsformpage from "./components/Adsformpage"
import Blogpreview from "./components/Blogpreview"
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
     <Route path="/profilepage" element={<Profilepage />} />
     <Route path="/blogpage" element={<Blogpage />} />
     <Route path="/blogpostpage" element={<BlogPostpage />} />
     <Route path="/leaderboard" element={<Leaderboard />} />
     <Route path="/adformpage" element={<Adsformpage />} />
     <Route path="/blogpreview/:id" element={<Blogpreview />}/>
     </Routes>
    </>
  )
}

export default App
