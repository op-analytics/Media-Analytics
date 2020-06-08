import { makeStyles } from '@material-ui/core/styles';

export const useSectionStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '80%',
  },
  div: {
    width: '70%',
    padding: '1rem',
  },
  image: {
    width: '90%',
    padding: '1rem 0rem',
  },
  sectionHeadings: {
    padding: '1rem 0rem',
  },
  subSectionHeadings: {
    padding: '0.5rem 0rem',
  },
});
