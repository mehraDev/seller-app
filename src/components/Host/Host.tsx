import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Dashboard from 'components/Dashboard/Dashboard'
import Billing from 'components/features/Billing/Billing'
import Inventory from 'components/features/Inventory/Inventory'
import Orders from 'components/features/Orders/Orders'
import Statistics from 'components/features/Statistics/Statistics'
import DeliveryTracker from 'components/features/Delivery/DeliveryTracker'
import {iconMap} from 'app/components/Dashboard/SideNav/SideNavIcon'
import {useEffect, useState} from 'react'
import Login from 'components/Login/Login'
import store from 'store'
import {Provider} from 'react-redux'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Transactions from 'components/features/Transactions/Transactions'



function Host() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true)
        localStorage.setItem('token', await user.getIdToken())
      } else {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
      }
    })
    return () => unsubscribe()
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    // show login screen
    return <Login onLogin={handleLogin} />
  }
  return (
    <>
      <Provider store={store}>
      <Router>
      <Routes>
        <Route path="/seller.digibhoomi.com">
          {isLoggedIn ? <Redirect to="/seller.digibhoomi.com/dashboard" /> : <Login />}
        </Route>
        <Route path="/seller.digibhoomi.com/signup">
          {isLoggedIn ? <Redirect to="/seller.digibhoomi.com/dashboard" /> : <Signup />}
        </Route>
        <Route path="/seller.digibhoomi.com/dashboard">
          {isLoggedIn ? <Dashboard /> : <Redirect to="/seller.digibhoomi.com" />}
        </Route>
      </Routes>
    </Router>
      </Provider>
    </>
  )
}

export default Host
