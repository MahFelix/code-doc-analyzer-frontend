import React, { useState, useEffect, useRef } from 'react';
import { Card, TextArea, Button, ResultContainer, Loader } from './styles';
import { analyzeCodeSnippet } from '../services/geminiService';

const DEBOUNCE_DELAY = 200; 

const CodeSnippetAnalyzer = ({ lastResult, onNewResult }) => {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const timerRef = useRef(null);

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

  useEffect(() => {
    if (!hasTyped) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleAnalyze();
    }, DEBOUNCE_DELAY);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [codeSnippet, hasTyped]);

  const handleChange = (e) => {
    setCodeSnippet(e.target.value);
    if (!hasTyped && e.target.value.trim().length > 0) {
      setHasTyped(true);
    }
  };

  return (
    <Card>
      <h2>Analisador de Código</h2>
      <p>Cole um trecho de código para receber uma análise detalhada</p>
      <TextArea
        placeholder="// Cole seu código aqui...\n// Exemplo: function minhaFuncao() { ... }"
        value={codeSnippet}
        onChange={handleChange}
      />
      <Button onClick={handleAnalyze} disabled={loading || !codeSnippet.trim()}>
        {loading ? <Loader /> : '🔍Analisar Código'}
      </Button>
      {lastResult && <ResultContainer>{lastResult}</ResultContainer>}
    </Card>
  );
};

export default CodeSnippetAnalyzer;
