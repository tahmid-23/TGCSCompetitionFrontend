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

export function getExperienceTypeDisplay(type: ExperienceType) {
  switch (type) {
    case ExperienceType.COMPETITION:
      return 'Competition';
    case ExperienceType.PROGRAM:
      return 'Program';
  }
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

export function getCategoryDisplay(category: Category) {
  switch (category) {
    case Category.TECHNOLOGY:
      return 'Technology';
    case Category.SCIENCE:
      return 'Science';
    case Category.BIOLOGY:
      return 'Biology';
    case Category.CHEMISTRY:
      return 'Chemistry';
    case Category.PHYSICS:
      return 'Physics';
    case Category.MATH:
      return 'Math';
    case Category.ENGINEERING:
      return 'Engineering';
    case Category.BUSINESS:
      return 'Business';
    case Category.MEDICAL:
      return 'Medical';
    case Category.CULINARY:
      return 'Culinary';
    case Category.MUSIC:
      return 'Music';
    case Category.ATHLETICS:
      return 'Athletics';
    case Category.ART:
      return 'Art';
    case Category.THEATER:
      return 'Theater';
    case Category.DANCE:
      return 'Dance';
    case Category['LANGUAGE ARTS']:
      return 'Language Arts';
    case Category.SPELLING:
      return 'Spelling';
    case Category.GEOGRAPHY:
      return 'Geography';
    case Category.HISTORY:
      return 'History';
    case Category['FOREIGN LANGUAGE']:
      return 'Foreign Language';
    case Category.CHESS:
      return 'Chess';
    case Category.RESEARCH:
      return 'Research';
    case Category.OTHER:
      return 'Other';
  }
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
