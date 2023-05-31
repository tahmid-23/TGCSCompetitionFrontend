import { IP_ADDRESS } from '../global';
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

export interface LoginResponse {
  admin: boolean;
  hasAccess: boolean;
}

export async function checkLogin(): Promise<LoginResponse> {
  const response = await fetch(`${IP_ADDRESS}/check-login`, {
    credentials: 'include'
  });

  return await response.json();
}

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
  const newCategories: ExperienceCategory[] = [];
  for (const category of experience.categories) {
    newCategories.push({
      category: Category[category.category as keyof typeof Category]
    });
  }
  experience.categories = newCategories;

  if (experience.type === ExperienceType.COMPETITION) {
    const newAwards: Award[] = [];
    for (const award of experience.awards) {
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
    for (const programFocus of experience.program_focuses) {
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
  const response = await fetch(`${IP_ADDRESS}/experiences`, {
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
  const response = await fetch(`${IP_ADDRESS}/experience/${experienceId}`, {
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

  const response = await fetch(`${IP_ADDRESS}/remove`, requestOptions);
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

  const response = await fetch(`${IP_ADDRESS}/insert`, requestOptions);

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

  const response = await fetch(`${IP_ADDRESS}/update`, requestOptions);

  if (response.status === 401) {
    onRequiresAuthentication();
    throw new Error('Authentication is required.');
  }
}
