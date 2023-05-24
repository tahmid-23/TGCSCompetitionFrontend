export enum AwardType {
  TROPHY,
  MEDAL,
  MONEY,
  CERTIFICATE,
  RECOGNITION,
  OTHER
}

export interface Award {
  awardId: number;
  type: AwardType;
  description?: string;
}

export interface Competition {
  judges_description?: string;
  judging_criteria: string;
  awards: Award[];
}
