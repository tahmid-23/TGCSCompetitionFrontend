import { API_BASE_URL } from '../global';
import { Award, AwardType } from './model/competition';
import {
  ExperienceType,
  ParticipantCount,
  ExperienceGrade,
  Grade,
  Experience,
  ExperienceCategory,
  Category
} from './model/experience';
import { Focus, ProgramFocus, ProgramType } from './model/program';

function createExperienceFromJson(json: unknown): Experience {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const experience = json as any;
  experience.type =
    ExperienceType[experience.type as keyof typeof ExperienceType];
  experience.participant_count =
    ParticipantCount[
      experience.participant_count as keyof typeof ParticipantCount
    ];
  const newGrades: ExperienceGrade[] = [];
  for (const grade of experience.grades) {
    newGrades.push({ grade: Grade[grade.grade as keyof typeof Grade] });
  }
  experience.grades = newGrades;
  experience.virtual = experience.virtual ? true : false;
  const newCategories: ExperienceCategory[] = [];
  for (const category of experience.categories) {
    newCategories.push({
      category: Category[category.category as keyof typeof Category]
    });
  }
  experience.categories = newCategories;

  if (experience.type === ExperienceType.COMPETITION) {
    const newAwards: Award[] = [];
    for (const award of experience.awards || []) {
      newAwards.push({
        award_id: award.award_id,
        type: AwardType[award.type as keyof typeof AwardType],
        description: award.description
      });
    }
    experience.awards = newAwards;
  } else if (experience.type === ExperienceType.PROGRAM) {
    experience.program_type =
      ProgramType[experience.program_type as keyof typeof ProgramType];
    const newProgramFocuses: ProgramFocus[] = [];
    for (const programFocus of experience.program_focuses || []) {
      newProgramFocuses.push({
        focus: Focus[programFocus.focus as keyof typeof Focus]
      });
    }
    experience.program_focuses = newProgramFocuses;
  }

  return experience;
}

export async function getExperiences(
  onRequiresAuthentication: () => unknown | undefined
): Promise<Experience[]> {
  const response = await fetch(`${API_BASE_URL}/experiences`, {
    credentials: 'include'
  });

  if (response.status === 401) {
    onRequiresAuthentication();
    throw new Error('Authentication is required.');
  }

  const json: Array<unknown> = await response.json();
  return json.map(createExperienceFromJson);
}

export async function getExperience(
  experienceId: number,
  onRequiresAuthentication: () => unknown | undefined
) {
  const response = await fetch(`${API_BASE_URL}/experience/${experienceId}`, {
    credentials: 'include'
  });

  if (response.status === 401) {
    onRequiresAuthentication();
    throw new Error('Authentication is required.');
  }

  return createExperienceFromJson(await response.json());
}

export async function remove(
  tableName: string,
  rowName: string,
  rowId: number,
  onRequiresAuthentication: () => unknown | undefined
) {
  const requestOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tableName: tableName,
      rowName: rowName,
      rowId: rowId
    })
  };

  const response = await fetch(`${API_BASE_URL}/remove`, requestOptions);
  if (response.status === 401) {
    onRequiresAuthentication();
    throw new Error('Authentication is required.');
  }
}

export async function insert(
  tableName: string,
  data: unknown,
  onRequiresAuthentication: () => unknown | undefined
): Promise<number> {
  const requestOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tableName: tableName, data: data })
  };

  const response = await fetch(`${API_BASE_URL}/insert`, requestOptions);

  if (response.status === 401) {
    onRequiresAuthentication();
    throw new Error('Authentication is required.');
  }

  return (await response.json()) as number;
}

export async function update(
  tableName: string,
  rowId: number,
  data: unknown,
  onRequiresAuthentication: () => unknown | undefined
): Promise<void> {
  const requestOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tableName: tableName,
      rowId: rowId,
      data: data
    })
  };

  const response = await fetch(`${API_BASE_URL}/update`, requestOptions);

  if (response.status === 401) {
    onRequiresAuthentication();
    throw new Error('Authentication is required.');
  }
}

export async function refreshRecommendations(
  topics: Category[],
  onRequiresAuthentication: () => void
): Promise<Record<number, number>> {
  const requestOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      preferenceVec: [
        Category.TECHNOLOGY,
        Category.SCIENCE,
        Category.BIOLOGY,
        Category.CHEMISTRY,
        Category.PHYSICS,
        Category.MATH,
        Category.ENGINEERING,
        Category.BUSINESS,
        Category.MEDICAL,
        Category.CULINARY,
        Category.MUSIC,
        Category.ATHLETICS,
        Category.ART,
        Category.THEATER,
        Category.DANCE,
        Category['LANGUAGE ARTS'],
        Category.SPELLING,
        Category.GEOGRAPHY,
        Category.HISTORY,
        Category['FOREIGN LANGUAGE'],
        Category.CHESS,
        Category.RESEARCH,
        Category.OTHER
      ].map((category) => (topics.includes(category) ? 1 : 0))
    })
  };

  const response = await fetch(
    `${API_BASE_URL}/recommendations`,
    requestOptions
  );
  if (response.status === 401) {
    onRequiresAuthentication();
    throw new Error('Authentication is required.');
  }

  return response.json();
}
