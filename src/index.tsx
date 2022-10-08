import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, Routes, HashRouter } from 'react-router-dom';
import store from '../store';
import './main.scss';
// import { createGlobalStyle } from 'styled-components';
// import OpenSansBold from './assets/fonts/OpenSans-Bold.ttf';

// const GlobalStyle = createGlobalStyle`
// @font-face {
//   font-family: "OpenSans-Bold";
//   src: local("OpenSans-Bold"),
//     url(${OpenSansBold}) format("truetype");
//   font-weight: normal;
// }
// body {
//   font-family: "OpenSans-Bold";
//   background-color: aquamarine;
//   margin:0;
// }
// `;

const Home = React.lazy(() => import('./components/Home'));

const About = () => <div>About</div>;

const App = () => {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </HashRouter>
      </Provider>
    </>
  );
};

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
