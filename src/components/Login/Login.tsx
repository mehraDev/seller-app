import {useState} from 'react'
import styled from 'styled-components'
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth} from '../../firebaseServices/firebase'
import logo from '../../assets/Logo/logo.png'
import NameLogo from 'ui/Logo/LogoSideNav'

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) => setEmail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const token = await userCredential.user.getIdToken()
      localStorage.setItem('token', token)
      onLogin()
    } catch (error) {
      console.error(error)
    }
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    console.log(auth)
    try {
      await signInWithPopup(auth, provider)
      onLogin()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <NameLogo hideName={false} />
      <Card>
        <LoginWrapper>
          <h2>Sign in to your account</h2>
          <Form onSubmit={handleLogin}>
            <Input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button type="submit">Login</Button>
          </Form>
          <Button onClick={handleGoogleLogin}>Login with Google</Button>
        </LoginWrapper>
        <div>
          <a href="#">Forgot password?</a>
        </div>
        <div>{/* Add footer and copyright information here */}</div>
      </Card>
      <LogoBg src={logo} />
    </Container>
  )
}

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
`
const LogoBg = styled.img`
  position: fixed;
  bottom: -34px;
  right: 21px;
  height: 49%;
  width: 38%;
`

const Input = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 1rem;
`

const Button = styled.button`
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0062cc;
  }
`



const Card = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  gap: 1rem;
  padding: 5rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  max-width: 450px;
  width: 100%;
  backdrop-filter: blur(5px);
  z-index: 2;
  margin-top: -1rem;
`

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 0.8rem;
  color: #999;
  margin-top: 2rem;
`

;<Footer>{/* Add footer and copyright information here */}</Footer>

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #011d36;
  background: linear-gradient(
    47deg,
    rgb(7, 22, 38) 0%,
    rgb(6 43 78 / 98%) 32%,
    rgb(18, 62, 104) 33%,
    rgb(0, 31, 58) 100%
  );
`
export default Login
