import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import DocumentationView from './components/DocumentationView';

// Estilo global para reset e configurações básicas
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #aaa3a3;
    line-height: 1.6;
  }

  * {
    box-sizing: border-box;
  }
`;

// Tema para a aplicação
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#8b8b8b',
    text: '#333',
  },
  spacing: {
    small: '10px',
    medium: '20px',
    large: '30px',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <DocumentationView />
      </>
    </ThemeProvider>
  );
}

export default App;