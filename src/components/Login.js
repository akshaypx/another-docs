import GoogleButton from "react-google-button";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        //console.log(res.user);
        localStorage.setItem("email", res.user.email);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <h2>Login Here!</h2>
      <div className="google-button">
        <GoogleButton onClick={signIn} />
      </div>
    </div>
  );
}
