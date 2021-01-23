import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Components/Navbar/Navbar";
import SignIn from "./Components/Sign/SignIn";
import SignUp from "./Components/Sign/SignUp";
function App() {
  return (
    <div className="App">
      <Navigation/>
      <SignUp/>
    </div>
  );
}

export default App;
