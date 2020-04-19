import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

//STYLE ET ANIMATIONS
import './static/css/bootstrap.css'
import './static/css/color.css'
import './static/css/icones.css'
import './static/css/animate.css'
import './static/css/style.css'
import './static/font/css/all.css'
import './static/font/css/fontawesome.css'
import './static/css/componentstyle.css'

import { CookiesProvider } from 'react-cookie';
import Chargement from './components/Chargement'
const App = lazy(() => import('./Apps'))


ReactDOM.render(
    <CookiesProvider>
        {/* les les cookies dans toues l'application */}
        {/* lancer une animation en attendant le chargement du component */}
        <Suspense fallback={<Chargement />}>
            <Router>
                <App />
            </Router>
        </Suspense>
    </CookiesProvider>
    ,
    document.getElementById('root')
);
