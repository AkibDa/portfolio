
import { Project, SkillCategory, Achievement } from './types';

export const PERSONAL_INFO = {
  name: "Sk Akib Ahammed",
  role: "AI Product Engineer",
  tagline: "Building autonomous multi-agent systems and intelligent LLM pipelines.",
  introduction: "I specialize in building intelligent systems that combine generative AI, multi-agent architectures, and real-world automation. Experienced in designing LLM-driven pipelines to solve complex problems through practical, scalable engineering.",
  location: "Kolkata, West Bengal",
  email: "ahammedskakib@gmail.com",
  linkedin: "https://www.linkedin.com/in/skakibahammed/",
  github: "https://github.com/AkibDa"
};

export const ACHIEVEMENTS: Achievement[] = [
  { label: "Intelligent Builds", value: "18+" },
  { label: "Apps in Production", value: "6" },
  { label: "Task Accuracy Boost", value: "30%" },
  { label: "AI Certifications", value: "8+" }
];

export const PROJECTS: Project[] = [
  {
    title: "CodeGenesis",
    description: "Autonomous Multi-Agent Development System orchestrated with LangGraph.",
    tags: ["Python", "LangGraph", "OpenAI", "Anthropic"],
    achievements: [
      "Simulated full SDLC using graph-based orchestration",
      "Self-correcting agent loops (debug-test-fix)",
      "Dynamic LLM routing for 30% accuracy improvement"
    ]
  },
  {
    title: "GreenPlate",
    description: "AI-Assisted Food Management Backend with FastAPI and Gemini.",
    tags: ["FastAPI", "Firebase", "Google Gemini", "Docker"],
    achievements: [
      "Multi-stall role-based access control",
      "AI-assisted menu extraction using Gemini",
      "Containerized deployment-ready architecture"
    ]
  },
  {
    title: "Face Recognition Attendance",
    description: "End-to-end backend for mass attendance marking using computer vision.",
    tags: ["Flask", "OpenCV", "MongoDB", "Python"],
    achievements: [
      "Face embedding pipeline for identity matching",
      "REST APIs for real-time image processing",
      "High-concurrency support for crowd images"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming",
    skills: [
      { name: "Python", description: "Primary language for AI/ML and automation.", isHighlight: true },
      { name: "C", description: "Foundational programming and systems logic." },
      { name: "Java", description: "Object-oriented software development." },
      { name: "SQL", description: "Relational database management and querying." }
    ]
  },
  {
    title: "AI / ML",
    skills: [
      { name: "LangGraph", description: "Agentic orchestration and complex AI workflows.", isHighlight: true },
      { name: "scikit-learn", description: "Classical machine learning algorithms." },
      { name: "TensorFlow", description: "Deep learning and neural networks." },
      { name: "Gemini API", description: "Multi-modal AI integration.", isHighlight: true }
    ]
  },
  {
    title: "Web & Backend",
    skills: [
      { name: "FastAPI", description: "Modern, high-performance web APIs.", isHighlight: true },
      { name: "Flask", description: "Lightweight WSGI web application framework." },
      { name: "Streamlit", description: "Rapid prototyping for AI apps." },
      { name: "Tailwind CSS", description: "Utility-first modern UI design." }
    ]
  },
  {
    title: "Tools",
    skills: [
      { name: "Docker", description: "Containerization and environment consistency.", isHighlight: true },
      { name: "Git", description: "Version control and collaborative workflows." },
      { name: "Jupyter", description: "Interactive data science and research." },
      { name: "Postman", description: "API testing and documentation." }
    ]
  }
];
