
export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  description: string;
  isHighlight?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Achievement {
  label: string;
  value: string;
}
