import { Routes, Route } from "react-router-dom";
import Layout from "./components/fixed/Layout";
import Home from "./views/Home";
import BookList from "./views/BookList";
import BookDetail from "./views/BookDetail";
import Profile from "./views/Profile";
import Missing from "./views/Missing";
import BookForm from "./views/BookForm";
import { useEffect, useState } from "react";
import { connectII, getCurrentIdentity } from "./services/connector";

function App() {
  const [identity, setIdentity] = useState("");

  const onLogin = async () => {
    try {
      await connectII();
      setAccount();
    } 
    catch (error) {
      console.log(error);
    }
  };

  const setAccount = () => {
    const currentIdentity = getCurrentIdentity();
    setIdentity(currentIdentity);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout onLogin={onLogin} identity={identity} />}
      >
        <Route index element={<Home identity={identity}/>} />
        <Route path="library" element={<BookList />} />
        <Route path="ebook" element={<BookDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="publish" element={<BookForm />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
