import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoteDetails from './components/NoteDetails';
import NotesList from './components/NoteList';
import NoteForm from './components/NoteForm';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NotesList />} />
      <Route path="/note/:id" element={<NoteDetails />} />
      <Route path="/create" element={<NoteForm />} />
      <Route path="/edit/:id" element={<NoteForm />} />
    </Routes>
  );
}

export default AppRoutes;