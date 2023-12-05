import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../public/css/tailwind.css';
import { ThemeProvider } from "@material-tailwind/react";
import {MaterialTailwindControllerProvider} from '../src/context/index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import UserReducer from './redux/Reducer/UserReducer';

const store = createStore(UserReducer, applyMiddleware(thunk))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<ThemeProvider>
					<MaterialTailwindControllerProvider>
						<App />
					</MaterialTailwindControllerProvider>
				</ThemeProvider>
			</BrowserRouter>
	</React.StrictMode>
  </Provider>,
)
