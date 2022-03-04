import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from './Register';
import Order from './Order';

export default function App(){
    return (
        <Router>
        <Routes>
          <Route path="" element={<Register />} exact />
          <Route path="/order" element={<Order />} />
        </Routes>
        </Router>
    )
}