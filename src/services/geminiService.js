import axios from 'axios';

const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';
const GEMINI_MODEL_NAME = 'gemini-1.5-pro';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Configurações avançadas de geração
const GENERATION_CONFIG = {
  temperature: 0.3, // Reduzido para respostas mais focadas
  maxOutputTokens: 3000,
  topP: 0.9,
  topK: 40
};

const SYSTEM_INSTRUCTION = `Você é um assistente especializado em análise de código e arquitetura de software.
Forneça respostas técnicas detalhadas, organizadas e práticas. Use markdown com formatação adequada.
Seja conciso mas completo, com exemplos quando relevante.`;

const callGeminiAPI = async (prompt, context = '') => {
  try {
    const response = await axios.post(
      `${GEMINI_API_BASE_URL}/models/${GEMINI_MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents: [{
          parts: [
            { text: context },
            { text: prompt }
          ]
        }],
        generationConfig: GENERATION_CONFIG,
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Resposta da API em formato inesperado');
    }

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Erro detalhado:', {
      status: error.response?.status,
      errorData: error.response?.data,
      config: error.config
    });
    throw new Error(`Erro na API: ${error.response?.data?.error?.message || error.message}`);
  }
};

export const analyzeCodeSnippet = async (codeSnippet, context = '') => {
  const prompt = `## Análise de Código Profissional

**Código fornecido:**
\`\`\`javascript
${codeSnippet}
\`\`\`

**Solicitação:**
Forneça uma análise abrangente com:

### 🔍 Análise Detalhada
- Estrutura e organização
- Fluxo de execução
- Dependências e interfaces

### ⚙️ Funcionalidade Principal
- Objetivo do código
- Comportamento esperado
- Entradas/Saídas

### 🛠️ Recomendações de Melhoria
- Otimizações de performance
- Boas práticas aplicáveis
- Refatorações sugeridas

### 🏗️ Padrões de Design Identificados
- Padrões arquiteturais
- Princípios SOLID aplicados/violados
- Acoplamento/Coesão

### ⚠️ Possíveis Problemas
- Antipadrões
- Vulnerabilidades
- Casos extremos não tratados

**Formato:**
- Use markdown com formatação adequada
- Seja técnico mas claro
- Inclua exemplos quando relevante`;

  try {
    const analysis = await callGeminiAPI(prompt, context);
    return { 
      analysis,
      metadata: {
        model: GEMINI_MODEL_NAME,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Falha na análise:', error);
    throw new Error(`Análise falhou: ${error.message}`);
  }
};

export const generateArchitectureDiagram = async (projectStructure, context = '') => {
  const prompt = `## Descrição de Arquitetura Detalhada

**Estrutura do Projeto:**
${projectStructure}

**Solicitação:**
Gere uma descrição completa que inclua:

### 🏛️ Visão Arquitetural Global
- Estilo arquitetural (microserviços, monolito, etc.)
- Camadas principais
- Tecnologias chave

### 🧩 Componentes Principais
- Módulos e serviços
- Responsabilidades de cada componente
- Interfaces públicas

### 🔄 Fluxos e Comunicação
- Diagrama de sequência (em texto)
- Protocolos de comunicação
- Padrões de interação

### 📈 Recomendações de Melhoria
- Possíveis gargalos
- Sugestões de escalabilidade
- Otimizações de custo/performance

**Formato:**
- Use Mermaid.js para diagramas quando possível
- Organize hierarquicamente
- Destaque decisões arquiteturais importantes`;

  try {
    const diagram = await callGeminiAPI(prompt, context);
    return {
      diagram,
      metadata: {
        model: GEMINI_MODEL_NAME,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Falha na geração:', error);
    throw new Error(`Geração falhou: ${error.message}`);
  }
};