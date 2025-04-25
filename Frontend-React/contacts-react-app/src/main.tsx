import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ContactsPage } from './pages/contacts_page/contacts_page';
import { NotFoundPage } from './pages/not_found_page/not_found_page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />  
      </Routes>
    </Router>
  </StrictMode>
)
