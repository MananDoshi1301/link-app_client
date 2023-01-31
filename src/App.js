import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Authentication/Signin';
import Signup from './components/Authentication/Signup';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './components/Home';
import LinkPage from './components/LinkPage/LinkPage';
import AddLink from './components/LinkPage/AddLink';
import ErrorPage from './components/ErrorPage';

function App() {

  const [details, setDetails] = useState({
    email: "user", id: "", isLoggedIn: false
  })

  return (
    <div className="App">
      <Router>
        <Navbar details={details} setDetails={setDetails} />
        <Routes>

          <Route path={'/signup'} element={<Signup />} />

          <Route path={'/signin'} element={<Signin setDetails={setDetails} />} />

          <Route path={'/link-page/add-link'} element={<AddLink userid={details.id} />} />

          <Route path={'/link-page'} element={<LinkPage details={details} setDetails={setDetails} />} />

          <Route path={'/'} element={<Home />} />

          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
