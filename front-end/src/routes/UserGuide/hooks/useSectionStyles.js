import { makeStyles } from '@material-ui/core/styles';

export const useSectionStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '50vw',
    minWidth: '22em',
    margin: '0 auto',
    padding: '0px',
  },
  div: {
    padding: '1rem 2rem 0rem 2rem',
  },
  listDiv: {
    paddingLeft: '1rem',
    marginLeft: '1rem',
  },
  image: {
    width: '90%',
    padding: '1rem 0rem',
  },
  sectionHeadings: {
    padding: '1rem 0rem 0rem 0rem',
  },
  subSectionHeadings: {
    padding: '1rem 0rem 0rem 0rem',
  },
});
