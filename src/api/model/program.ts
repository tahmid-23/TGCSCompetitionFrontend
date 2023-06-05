export enum ProgramType {
  INTERN,
  PRESENTATION,
  RESEARCH,
  ACADEMIC
}

export function getProgramTypeDisplay(programType: ProgramType) {
  switch (programType) {
    case ProgramType.INTERN:
      return 'Internship';
    case ProgramType.PRESENTATION:
      return 'Presentation';
    case ProgramType.RESEARCH:
      return 'Research';
    case ProgramType.ACADEMIC:
      return 'Academic';
  }
}

export enum Focus {
  THEORETICAL,
  PRACTICAL
}

export function getFocusDisplay(focus: Focus) {
  switch (focus) {
    case Focus.THEORETICAL:
      return 'Theoretical';
    case Focus.PRACTICAL:
      return 'Practical';
  }
}

export interface ProgramFocus {
  focus: Focus;
}

export interface Program {
  program_type: ProgramType;
  monthly_fee: number;
  time_commitment: number;
  program_focuses: ProgramFocus[];
}
