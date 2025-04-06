import React, { useState, useEffect, useRef } from 'react';
import { Card, TextArea, Button, ResultContainer, Loader } from './styles';
import { generateArchitectureDiagram } from '../services/geminiService';

const DEBOUNCE_DELAY = 200;

const ArchitectureDiagram = ({ lastResult, onNewResult }) => {
  const [projectStructure, setProjectStructure] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const timerRef = useRef(null);

  const handleGenerateDiagram = async () => {
    setLoading(true);
    try {
      const result = await generateArchitectureDiagram(projectStructure);
      onNewResult(result.diagram);
    } catch (error) {
      console.error('Erro na geração do diagrama:', error);
      onNewResult('❌ Erro ao gerar diagrama: ' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!hasTyped) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleGenerateDiagram();
    }, DEBOUNCE_DELAY);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [projectStructure, hasTyped]);

  const handleChange = (e) => {
    setProjectStructure(e.target.value);
    if (!hasTyped && e.target.value.trim().length > 0) {
      setHasTyped(true);
    }
  };

  return (
    <Card>
      <h2>Gerador de Diagrama de Arquitetura</h2>
      <p>Descreva a estrutura do projeto para gerar um diagrama arquitetural</p>
      <TextArea
        placeholder="Descreva os componentes, tecnologias e fluxos do seu sistema..."
        value={projectStructure}
        onChange={handleChange}
      />
      <Button onClick={handleGenerateDiagram} disabled={loading || !projectStructure.trim()}>
        {loading ? (<><Loader /> Gerando...</>) : ('🏗️ Gerar Diagrama')}
      </Button>
      {lastResult && (
        <ResultContainer>
          <h3>📐 Diagrama de Arquitetura</h3>
          <pre>{lastResult}</pre>
        </ResultContainer>
      )}
    </Card>
  );
};

export default ArchitectureDiagram;
