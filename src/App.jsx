/* Barrio Bamba — router.
   Sitio público (menú responsivo) en la raíz; panel del dueño en /#/admin
   (sin enlace visible: el dueño se guarda esa dirección). */
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ClienteDesktop } from './cliente/ClienteDesktop.jsx';
import { AdminApp } from './admin/AdminApp.jsx';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ClienteDesktop />} />
        <Route path="/admin" element={<AdminApp />} />
        <Route path="*" element={<ClienteDesktop />} />
      </Routes>
    </HashRouter>
  );
}
