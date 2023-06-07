import {
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  useTheme
} from '@mui/material';
import {
  Category,
  Experience,
  ExperienceType,
  Grade
} from '../../api/model/experience';
import GradeSelection from '../Search/GradeSelection';
import TopicSelection from '../Search/TopicSelection';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AwardSelection from '../Search/AwardSelection';
import ProgramSelection from '../Search/ProgramSelection';
import { AwardType, Competition } from '../../api/model/competition';
import { Program } from '../../api/model/program';
import { ProgramType } from '../../api/model/program';
import { Filter } from '../ExperienceList/ExperienceList';

function createFilter(
  experienceType: ExperienceType | undefined,
  grades: Grade[],
  topics: Category[],
  awards: AwardType[],
  programTypes: ProgramType[]
): Filter {
  return (experience: Experience) => {
    if (experienceType !== undefined && experience.type !== experienceType) {
      return false;
    }

    let gradeOverlap = false;
    outer: for (const grade of grades) {
      for (const experienceGrade of experience.grades.map(
        (grade) => grade.grade
      )) {
        if (grade === experienceGrade) {
          gradeOverlap = true;
          break outer;
        }
      }
    }

    if (!gradeOverlap) {
      return false;
    }

    let topicOverlap = false;
    outer: for (const topic of topics) {
      for (const experienceTopic of experience.categories.map(
        (topic) => topic.category
      )) {
        if (topic === experienceTopic) {
          topicOverlap = true;
          break outer;
        }
      }
    }

    if (!topicOverlap) {
      return false;
    }

    if (experienceType === undefined) {
      return true;
    }

    if (experienceType === ExperienceType.COMPETITION) {
      const competition = experience as unknown as Competition;

      let awardOverlap = false;
      outer: for (const award of awards) {
        for (const competitionAward of (competition.awards || []).map(
          (award) => award.type
        )) {
          if (award === competitionAward) {
            awardOverlap = true;
            break outer;
          }
        }
      }

      return awardOverlap;
    } else if (experienceType === ExperienceType.PROGRAM) {
      console.log(programTypes);
      const program = experience as unknown as Program;

      for (const programType of programTypes) {
        if (program.program_type === programType) {
          return true;
        }
      }

      return false;
    }

    return true;
  };
}

interface FilterMenuProps {
  topics: Category[];
  setTopics: (topics: Category[]) => void;
  onChangeFilter?: (filter: Filter) => void;
}

const FilterMenu = ({ topics, setTopics, onChangeFilter }: FilterMenuProps) => {
  const [experienceType, setExperienceType] = useState<ExperienceType>();
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [grades, setGrades] = useState<Grade[]>([
    Grade['K-2'],
    Grade['3-5'],
    Grade['6-8'],
    Grade['9-12']
  ]);
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [programTypes, setProgramTypes] = useState<ProgramType[]>([]);
  const theme = useTheme();

  return (
    <List
      sx={{
        border: `0.25vh solid ${theme.palette.primary.dark}`,
        padding: '1vh'
      }}
    >
      <ListItem disablePadding>
        <ListItemText
          primary="Type"
          primaryTypographyProps={{ variant: 'h5' }}
        />
      </ListItem>
      <ListItem disablePadding>
        <RadioGroup
          name="Type"
          defaultValue="All"
          row
          onChange={(e) => {
            let newExperienceType: ExperienceType | undefined;
            let newAwards: AwardType[] = awards;
            let newProgramTypes: ProgramType[] = programTypes;

            switch (e.currentTarget.value) {
              case ExperienceType[ExperienceType.COMPETITION]:
                newExperienceType = ExperienceType.COMPETITION;
                setAwards(
                  (newAwards = [
                    AwardType.TROPHY,
                    AwardType.MEDAL,
                    AwardType.MONEY,
                    AwardType.CERTIFICATE,
                    AwardType.RECOGNITION,
                    AwardType.OTHER
                  ])
                );
                break;
              case ExperienceType[ExperienceType.PROGRAM]:
                newExperienceType = ExperienceType.PROGRAM;
                setProgramTypes(
                  (newProgramTypes = [
                    ProgramType.INTERN,
                    ProgramType.PRESENTATION,
                    ProgramType.RESEARCH,
                    ProgramType.ACADEMIC
                  ])
                );
                break;
              default:
                newExperienceType = undefined;
                setAwards((newAwards = []));
                setProgramTypes((newProgramTypes = []));
                break;
            }

            setExperienceType(newExperienceType);
            onChangeFilter?.(
              createFilter(
                newExperienceType,
                grades,
                topics,
                newAwards,
                newProgramTypes
              )
            );
          }}
        >
          <FormControlLabel
            label="Competition"
            control={
              <Radio
                id="competition_button"
                value={ExperienceType[ExperienceType.COMPETITION]}
              />
            }
          />
          <FormControlLabel
            label="Program"
            control={
              <Radio
                id="program_button"
                value={ExperienceType[ExperienceType.PROGRAM]}
              />
            }
          />
          <FormControlLabel
            label="All"
            control={<Radio id="all_button" value="All" />}
          />
        </RadioGroup>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemText
          primary="Grades"
          primaryTypographyProps={{ variant: 'h5' }}
        />
      </ListItem>
      <ListItem disablePadding>
        <GradeSelection
          grades={grades}
          onGradeChange={(newGrades) => {
            setGrades(newGrades);
            onChangeFilter?.(
              createFilter(
                experienceType,
                newGrades,
                topics,
                awards,
                programTypes
              )
            );
          }}
        />
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton
          sx={{ padding: 0 }}
          onClick={() => setTopicsOpen(!topicsOpen)}
        >
          <ListItemText
            primary="Topics"
            primaryTypographyProps={{ variant: 'h5' }}
          />
          {topicsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <Collapse in={topicsOpen} timeout="auto">
          <TopicSelection
            topics={topics}
            onTopicChange={(newTopics) => {
              setTopics(newTopics);
              onChangeFilter?.(
                createFilter(
                  experienceType,
                  grades,
                  newTopics,
                  awards,
                  programTypes
                )
              );
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              const newTopics =
                topics.length === 0
                  ? [
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
                    ]
                  : [];
              setTopics(newTopics);
              onChangeFilter?.(
                createFilter(
                  experienceType,
                  grades,
                  newTopics,
                  awards,
                  programTypes
                )
              );
            }}
          >
            {topics.length === 0 ? 'Select All' : 'Clear All'}
          </Button>
        </Collapse>
      </ListItem>
      {experienceType === ExperienceType.COMPETITION && (
        <>
          <Divider />
          <ListItem disablePadding>
            <ListItemText
              primary="Awards"
              primaryTypographyProps={{ variant: 'h5' }}
            />
          </ListItem>
          <ListItem disablePadding>
            <AwardSelection
              awards={awards}
              onAwardChange={(newAwards) => {
                setAwards(newAwards);
                onChangeFilter?.(
                  createFilter(
                    experienceType,
                    grades,
                    topics,
                    newAwards,
                    programTypes
                  )
                );
              }}
            />
          </ListItem>
        </>
      )}
      {experienceType === ExperienceType.PROGRAM && (
        <>
          <Divider />
          <ListItem disablePadding>
            <ListItemText
              primary="Program Types"
              primaryTypographyProps={{ variant: 'h5' }}
            />
          </ListItem>
          <ListItem disablePadding>
            <ProgramSelection
              programTypes={programTypes}
              onProgramTypeChange={(newProgramTypes) => {
                setProgramTypes(newProgramTypes);
                onChangeFilter?.(
                  createFilter(
                    experienceType,
                    grades,
                    topics,
                    awards,
                    newProgramTypes
                  )
                );
              }}
            />
          </ListItem>
        </>
      )}
    </List>
  );
};

export default FilterMenu;
