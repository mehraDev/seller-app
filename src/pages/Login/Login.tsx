import { useState } from "react";
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { addRoleToUser } from "../../firebase/fb-auth";
interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // User signed in successfully
    const user = userCredential.user;
    console.log(`User ${user.uid} signed in successfully!`);
    addRoleToUser('seller')
  })
  .catch((error) => {
    // Handle errors here
    console.error(error);
  });
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Logins</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
