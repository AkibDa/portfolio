import React from 'react';
// If you get errors about these icons, ensure you have 'lucide-react' installed
// or replace them with simple strings/emojis if you prefer.
import { Brain, Server, Activity, Database } from 'lucide-react';

export const projects = [
  {
    title: "CodeGenesis: Agentic Orchestration",
    description: "A multi-agent development system that simulates a full SDLC. I replaced standard prompt chains with a cyclic state graph (LangGraph) to enable self-healing code generation.",
    link: "https://github.com/AkibDa/CodeGenesis", 
    type: "Agentic AI",
    icon: <Brain size={20} />, // This makes the "Brain" icon appear
    tags: ["LangGraph", "Python", "OpenAI API", "Cyclic Graphs"],
    metrics: [
      { label: "Error Reduction", value: "40%" },
      { label: "Accuracy", value: "+30%" }
    ],
    architecture: "User → Planner → Architect → Coder ⟲ QA Loop"
  },
  {
    title: "Incepta: Inference Engine",
    description: "Migrated a synchronous Streamlit prototype to an asynchronous FastAPI microservice. Containerized the pipeline to support batch processing for Generative AI models.",
    link: "https://github.com/AkibDa/Incepta",
    type: "Backend Engineering",
    icon: <Server size={20} />,
    tags: ["FastAPI", "Docker", "Redis", "HuggingFace"],
    metrics: [
      { label: "Latency Cut", value: "25%" },
      { label: "Uptime", value: "99%" }
    ],
    architecture: "Client → Load Balancer → FastAPI Workers → Async Queue"
  },
  {
    title: "DiagnoWise: RAG Healthcare Bot",
    description: "An AI assistant combining symptom analysis with a medical chatbot. Implemented Retrieval-Augmented Generation (RAG) to ground LLaMA-3 responses in verified medical datasets.",
    link: "https://github.com/AkibDa/DiagnoWise",
    type: "Full Stack AI",
    icon: <Activity size={20} />,
    tags: ["LLaMA-3", "RAG", "Vector DB", "React"],
    metrics: [
      { label: "Response Accuracy", value: "High" },
      { label: "Hallucination", value: "Low" }
    ],
    // Architecture can be optional, the card handles it if missing
    architecture: "Query → Vector Search → Context Window → LLM Response"
  }
];