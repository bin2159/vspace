import Logo from "@/components/Logo";
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LoginFooter";
import LoginForm from "./LoginForm";
export default function LoginLayout() {
  return (
  <div className="mx-auto w-full max-w-sm lg:w-96">
    <div>
     <Logo/>
      <LoginHeader/>
    </div>

    <div className="mt-10">
      <div>
       <LoginForm/>
      </div>
      <LoginFooter/>

    </div>
  </div>
  )
}