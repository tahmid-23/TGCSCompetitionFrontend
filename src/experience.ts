export enum ParticipantCount {
  '1-10',
  '11-50',
  '51-99',
  '100+'
}

export enum ExperienceType {
  COMPETITION,
  PROGRAM
}

export enum Category {
  TECHNOLOGY,
  SCIENCE,
  BIOLOGY,
  CHEMISTRY,
  PHYSICS,
  MATH,
  ENGINEERING,
  BUSINESS,
  MEDICAL,
  CULINARY,
  MUSIC,
  ATHLETICS,
  ART,
  THEATER,
  DANCE,
  'LANGUAGE ARTS',
  SPELLING,
  GEOGRAPHY,
  HISTORY,
  'FOREIGN LANGUAGE',
  CHESS,
  RESEARCH,
  OTHER
}

export interface ExperienceCategory {
  category: Category;
}

export enum Grade {
  'K-2',
  '3-5',
  '6-8',
  '9-12'
}

export interface ExperienceGrade {
  grade: Grade;
}

export interface ImportantDate {
  date: Date;
  description: string;
}

export interface Experience {
  experience_id: number;
  website_url?: string;
  entry_fee: number;
  participant_count?: ParticipantCount;
  name: string;
  origin_year?: number;
  purpose?: string;
  description: string;
  required_items?: string;
  advice?: string;
  score_time: number;
  score_difficulty: number;
  score_benefit: number;
  score_mgmt: number;
  type: ExperienceType;
  virtual: boolean;
  address?: string;
  start_date?: Date;
  end_date?: Date;
  prerequisite_description?: string;
  entry_description?: string;
  categories: ExperienceCategory[];
  grades: ExperienceGrade[];
  prerequisites: number[];
  sponsors: number[];
  important_dates: ImportantDate[];
}
