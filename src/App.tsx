import React from 'react';
import { Provider } from 'react-redux';
import { store } from './domain/store';
import './App.css';
import { StartPage } from './pages/StartPage';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <StartPage/>
        </header>
      </div>
    </Provider>
  );
}

export default App;
