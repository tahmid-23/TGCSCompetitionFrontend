export enum AwardType {
  TROPHY,
  MEDAL,
  MONEY,
  CERTIFICATE,
  RECOGNITION,
  OTHER
}

export function getAwardTypeDisplay(awardType: AwardType) {
  switch (awardType) {
    case AwardType.TROPHY:
      return 'Trophy';
    case AwardType.MEDAL:
      return 'Medal';
    case AwardType.MONEY:
      return 'Money';
    case AwardType.CERTIFICATE:
      return 'Certificate';
    case AwardType.RECOGNITION:
      return 'Recognition';
    case AwardType.OTHER:
      return 'Other';
  }
}

export interface Award {
  award_id: number;
  type: AwardType;
  description?: string;
}

export interface Competition {
  judges_description?: string;
  judging_criteria: string;
  awards: Award[];
}
