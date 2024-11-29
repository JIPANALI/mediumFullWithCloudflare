import Auth from "../components/Auth"
import Quote from "../components/Quote"
import "./Signup.css"

const Signup = () => {
  return (
    <div className="signup-bg">
        <div className="signupleft"><Auth type="signup"/></div>
        <div className="signupleft"> <Quote/></div>
       
    </div>
  )
}

export default Signup