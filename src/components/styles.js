// styles.js
import styled from 'styled-components';

// Cores do tema
export const colors = {
  primary: '#2563eb',
  secondary: '#1e40af',
  accent: '#3b82f6',
  background: 'rgb(160, 163, 163)',
  text: '#1e293b',
  textLight: ' #64748b',
  error: '#dc2626',
  success: '#16a34a',
  warning: '#d97706'
};

// Tipografia
export const typography = {
  heading: '2rem',
  subheading: '1.5rem',
  body: '1rem',
  small: '0.875rem'
};

// Container principal
export const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  color: ${colors.text};
  font-family: 'Inter', sans-serif;
`;

// Container de conteúdo
export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

// Cabeçalho
export const Header = styled.header`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  color: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Tabs
export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  margin-right: 0.5rem;
  background-color: ${props => props.active ? colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : colors.text};
  border: none;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? colors.primary : '#e2e8f0'};
  }
`;

// Cards/Containers
export const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Inputs
export const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  transition: border 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.accent};
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

// Botões
export const Button = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${colors.secondary};
  }

  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }
`;

// Resultados
export const ResultContainer = styled(Card)`
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: 'Fira Code', monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    background-color: #f1f5f9;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }

  h3 {
    margin-top: 0;
    color: ${colors.primary};
  }
`;

// Loader
export const Loader = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;