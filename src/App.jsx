import { Routes, Route } from 'react-router-dom';
import Layout from './components/fixed/Layout';
import Home from './views/Home';
import BookList from './views/BookList';
import BookDetail from './views/BookDetail';
import Profile from './views/Profile';
import Missing from './views/Missing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="library" element={<BookList />} />
        <Route path="book/:id" element={<BookDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App