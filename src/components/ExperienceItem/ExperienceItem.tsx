import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Link, ListItemButton, ListItemText } from '@mui/material';
import { Category, Experience } from '../../api/model/experience';
import styles from './ExperienceList.module.css';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLogin } from '../../features/login';

interface ExperienceItemProps {
  experience: Experience;
  highlightId?: number;
  onSelect?: (arg0: boolean) => void;
  onDelete?: () => void;
}

const ExperienceItem = ({
  experience,
  highlightId,
  onSelect,
  onDelete
}: ExperienceItemProps) => {
  const [hovered, setHovered] = useState(false);
  const loginState = useSelector(selectLogin);

  return (
    <ListItemButton
      key={experience.experience_id}
      selected={experience.experience_id === highlightId}
      onClick={() => onSelect?.(experience.experience_id !== highlightId)}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.wrapper}>
        <div className={styles.experienceLinkWrapper}>
          <Link
            className={styles.experienceLink}
            component={RouterLink}
            to={`/view/${experience.experience_id}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <ListItemText>
              {experience.name} (
              {experience.categories
                .map((category) => Category[category.category])
                .join(', ')}
              )
            </ListItemText>
          </Link>
        </div>
        <div>
          <IconButton
            component={RouterLink}
            to={`/view/${experience.experience_id}`}
            target="_blank"
            rel="noreferrer"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            sx={
              !hovered && experience.experience_id !== highlightId
                ? { visibility: 'hidden' }
                : undefined
            }
          >
            <Visibility />
          </IconButton>
          {loginState.admin && (
            <>
              <IconButton
                component={RouterLink}
                to={`/edit/${experience.experience_id}`}
                target="_blank"
                rel="noreferrer"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                sx={
                  !hovered && experience.experience_id !== highlightId
                    ? { visibility: 'hidden' }
                    : undefined
                }
              >
                <Edit />
              </IconButton>
              <IconButton
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
                sx={
                  !hovered && experience.experience_id !== highlightId
                    ? { visibility: 'hidden' }
                    : undefined
                }
              >
                <Delete />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </ListItemButton>
  );
};

export default ExperienceItem;
