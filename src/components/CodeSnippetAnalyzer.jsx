import React, { useState } from 'react';
import { 
  Card,
  TextArea,
  Button,
  ResultContainer,
  Loader
} from './styles';
import { analyzeCodeSnippet } from '../services/geminiService';

const CodeSnippetAnalyzer = ({ lastResult, onNewResult }) => {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeCodeSnippet(codeSnippet);
      onNewResult(result.analysis);
    } catch (error) {
      console.error('Erro na análise:', error);
      onNewResult('❌ Erro na análise do código: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <Card>
      <h2>Analisador de Código</h2>
      <p>Cole um trecho de código para receber uma análise detalhada</p>
      
      <TextArea
        placeholder="// Cole seu código aqui...\n// Exemplo: function minhaFuncao() { ... }"
        value={codeSnippet}
        onChange={(e) => setCodeSnippet(e.target.value)}
      />
      
      <Button onClick={handleAnalyze} disabled={loading || !codeSnippet.trim()}>
        {loading ? (
          <>
            <Loader /> Analisando...
          </>
        ) : (
          '🔍 Analisar Código'
        )}
      </Button>
      
      {lastResult && (
        <ResultContainer>
          <h3>📋 Resultado da Análise</h3>
          <pre>{lastResult}</pre>
        </ResultContainer>
      )}
    </Card>
  );
};

export default CodeSnippetAnalyzer;