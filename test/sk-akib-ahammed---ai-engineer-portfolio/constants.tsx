
import { Project, SkillCategory, Achievement } from './types';

export const PERSONAL_INFO = {
  name: "Sk Akib Ahammed",
  role: "AI Systems Engineer",
  tagline: "Designing autonomous multi-agent systems and production-grade LLM pipelines.",
  introduction: "I build intelligent systems that combine generative AI, multi-agent orchestration, and scalable backend engineering. My focus is on shipping production-ready AI solutions — from agentic workflows to real-world automation pipelines that solve practical problems.",
  location: "Kolkata, India",
  email: "ahammedskakib@gmail.com",
  linkedin: "https://www.linkedin.com/in/skakibahammed",
  github: "https://github.com/AkibDa"
};

export const ACHIEVEMENTS: Achievement[] = [
  { label: "AI & Backend Projects Built", value: "18+" },
  { label: "Production-Ready Deployments", value: "6" },
  { label: "LLM Workflow Optimization", value: "30%" },
  { label: "Professional Certifications", value: "8+" }
];

export const PROJECTS: Project[] = [
  {
    title: "CodeGenesis",
    description: "Autonomous multi-agent software development system powered by LangGraph orchestration.",
    tags: ["Python", "LangGraph", "OpenAI", "Anthropic"],
    achievements: [
      "Graph-based agent orchestration simulating full SDLC lifecycle",
      "Self-correcting debug-test-fix agent loops",
      "Dynamic LLM routing improving task accuracy by 30%"
    ],
    link: "https://github.com/AkibDa/Code_Genesis"
  },
  {
    title: "GreenPlate",
    description: "AI-assisted food management backend built with FastAPI and Gemini.",
    tags: ["FastAPI", "Firebase", "Google Gemini", "Docker"],
    achievements: [
      "Role-based access control for multi-stall operations",
      "LLM-powered menu data extraction using Gemini",
      "Dockerized production-ready backend architecture"
    ],
    link: "https://github.com/GreenPlateByCodeNewbies/backend"
  },
  {
    title: "Face Recognition Attendance System",
    description: "Computer vision-based attendance automation backend with real-time processing.",
    tags: ["Flask", "OpenCV", "MongoDB", "Python"],
    achievements: [
      "Face embedding and similarity matching pipeline",
      "RESTful APIs for real-time image inference",
      "Optimized backend handling concurrent image uploads"
    ],
    link: "https://github.com/sup-vision/Recognition"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming",
    skills: [
      { name: "Python", description: "Core language for AI systems, backend APIs, and automation.", isHighlight: true },
      { name: "C", description: "Strong foundation in systems-level programming." },
      { name: "Java", description: "Object-oriented application development." }
    ]
  },
  {
    title: "AI Engineering",
    skills: [
      { name: "LangGraph", description: "Multi-agent orchestration and graph-based AI workflows.", isHighlight: true },
      { name: "LLM Integration", description: "Designing structured prompt pipelines and dynamic model routing." },
      { name: "scikit-learn", description: "Classical machine learning and model evaluation." },
      { name: "TensorFlow", description: "Neural network development and experimentation." },
      { name: "Streamlit", description: "Rapid AI application prototyping." }
    ]
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "FastAPI", description: "High-performance API architecture and async services.", isHighlight: true },
      { name: "Flask", description: "Lightweight backend services and rapid prototyping." },
      { name: "SQL", description: "Relational data modeling and query optimization." },
      { name: "Tailwind CSS", description: "Modern responsive UI styling." }
    ]
  },
  {
    title: "DevOps & Tooling",
    skills: [
      { name: "Docker", description: "Containerization and environment reproducibility.", isHighlight: true },
      { name: "Git", description: "Version control and collaborative development workflows." },
      { name: "Postman", description: "API testing and contract validation." },
      { name: "Jupyter", description: "Experimentation and model research." }
    ]
  }
];
