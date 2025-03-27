import React, { useState } from 'react';
import { 
  AppContainer,
  ContentContainer,
  Header,
  TabContainer,
  Tab
} from './styles';
import CodeSnippetAnalyzer from './CodeSnippetAnalyzer';
import ArchitectureDiagram from './ArchitectureDiagram';

const DocumentationView = () => {
  const [activeTab, setActiveTab] = useState('codeAnalysis');
  const [codeAnalysisResult, setCodeAnalysisResult] = useState(null);
  const [architectureDiagramResult, setArchitectureDiagramResult] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'codeAnalysis':
        return (
          <CodeSnippetAnalyzer 
            lastResult={codeAnalysisResult}
            onNewResult={setCodeAnalysisResult}
          />
        );
      case 'architectureDiagram':
        return (
          <ArchitectureDiagram 
            lastResult={architectureDiagramResult}
            onNewResult={setArchitectureDiagramResult}
          />
        );
      default:
        return (
          <CodeSnippetAnalyzer 
            lastResult={codeAnalysisResult}
            onNewResult={setCodeAnalysisResult}
          />
        );
    }
  };

  return (
    <AppContainer>
      <Header>
        <ContentContainer>
          <h1>AI Code Docs Analyzer</h1>
          <p>Documentação técnica automatizada com IA</p>
        </ContentContainer>
      </Header>
      
      <ContentContainer>
        <TabContainer>
          <Tab 
            active={activeTab === 'codeAnalysis'}
            onClick={() => handleTabChange('codeAnalysis')}
          >
            Análise de Código
          </Tab>
          <Tab 
            active={activeTab === 'architectureDiagram'}
            onClick={() => handleTabChange('architectureDiagram')}
          >
            Diagrama de Arquitetura
          </Tab>
        </TabContainer>

        {renderContent()}
      </ContentContainer>
    </AppContainer>
  );
};

export default DocumentationView;