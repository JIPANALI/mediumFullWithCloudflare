
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import Signin from './pages/Signin'
import Appbar from './components/Appbar'
import SingleBlogPage from './pages/SingleBlogPage'
import PublishPage from './pages/PublishPage'



function App() {
  const nameVal=localStorage.getItem("name")||""


  return (
 
    <div className='homepage-bg'>
     
    <BrowserRouter>
    <Appbar authorName={nameVal}/>
    <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/blog/:id' element={<SingleBlogPage/>}/>
        <Route path='/publish' element={<PublishPage/>}/>
        <Route path='/' element={<Signin/>}/>
    </Routes>
    </BrowserRouter>
   
    </div>

  )
}

export default App
