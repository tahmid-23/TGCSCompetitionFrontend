export enum ProgramType {
  INTERN,
  PRESENTATION,
  RESEARCH,
  ACADEMIC
}

export enum Focus {
  THEORETICAL,
  PRACTICAL
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
