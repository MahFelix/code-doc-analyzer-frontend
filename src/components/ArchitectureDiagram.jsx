import React, { useState } from 'react';
import { 
  Card,
  TextArea,
  Button,
  ResultContainer,
  Loader
} from './styles';
import { generateArchitectureDiagram } from '../services/geminiService';

const ArchitectureDiagram = ({ lastResult, onNewResult }) => {
  const [projectStructure, setProjectStructure] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <Card>
      <h2>Gerador de Diagrama de Arquitetura</h2>
      <p>Descreva a estrutura do projeto para gerar um diagrama arquitetural</p>
      
      <TextArea
        placeholder="Descreva os componentes, tecnologias e fluxos do seu sistema..."
        value={projectStructure}
        onChange={(e) => setProjectStructure(e.target.value)}
      />
      
      <Button 
        onClick={handleGenerateDiagram} 
        disabled={loading || !projectStructure.trim()}
      >
        {loading ? (
          <>
            <Loader /> Gerando...
          </>
        ) : (
          '🏗️ Gerar Diagrama'
        )}
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