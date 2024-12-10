import logo from '../assets/logo.png'
const Logo = () => {
  return (
    <div>
      <img
        alt="Your Company"
        src={logo}
        className="h-10 w-auto"
      />
    </div>
  );
};

export default Logo;