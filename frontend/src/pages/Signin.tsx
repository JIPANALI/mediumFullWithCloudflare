import Auth from "../components/Auth"
import Quote from "../components/Quote"
import "./Signup.css"

const Signin = () => {
  return (
    <div className="signup-bg">
    <div className="signupleft"><Auth type="signin"/></div>
    <div className="signupleft"> <Quote/></div>
   
</div>
  )
}

export default Signin