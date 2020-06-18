import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles({
  aboutText: {
    paddingTop: 15,
    paddingBottom: '1rem',
  },
  sectionHeader: {
    paddingTop: '1rem',
  },
  sectionDiv: {
    paddingLeft: '1rem',
    marginLeft: '1rem',
    marginBottom: '1rem',
  },
  sectionImage: {
    padding: '1rem 1rem 1rem 1rem',
    width: '100%',
  },
});

function AboutSection() {
  const classes = useStyles();
  return (
    <>
      <h1>About</h1>
      <h2 className={classes.sectionHeadings}>Introduction</h2>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        The Media-Analytics.org site is an experimental research project
        attempting to democratize access to statistical metrics about language
        usage in a comprehensive sample of news and opinion articles from popular
        news media outlets.
      </Typography>
      <h2 className={classes.sectionHeadings}>
        Disclaimer
      </h2>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        Much of the functionality of this site has been created by students
        supervised by a single lecturer and thus is provided as is. We cannot
        guarantee site availability, the accuracy of the statistical metrics
        provided, lack of code bugs, exhaustive data coverage or ability to
        provide user support due to our resources and time being limited. Any
        user of the site takes full responsibility for any usage of the data
        provided by this web application. That being said, we have created this
        application to the best of our ability and sincerely believe that the
        service provided is useful. We will strive to improve and extend the
        capabilities of the site over the coming months.
      </Typography>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        We currently lack funding to hire cloud infrastructure, so we use an old
        and cranky server to serve the app. To strive for widespread usage of the
        service, we only allow 100 queries per month per registered user. We hope
        to find the funding to use cloud infrastructure and lift this restriction
        before long.
      </Typography>
      <h2 className={classes.sectionHeadings}>
        Contact
      </h2>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        You can contact us at&nbsp;
        <a href="mailto:media.analytics.org@gmail.com">
          media.analytics.orgATgmailDOTcom
        </a>
      </Typography>
      <h2 className={classes.sectionHeadings}>
        Raw textual data of news articles
      </h2>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        The textual data of news and opinion articles is available in the
        outlet&apos;s online domains and public cache repositories such as:
      </Typography>
      <div className={classes.sectionDiv}>
        <ul>
          <li>
            <Typography variant="body1" component="p" color="textPrimary">
              Google cache
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p" color="primary">
              <a href="https://archive.org/web/web.php">
                https://archive.org/web/web.php
              </a>
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p" color="primary">
              <a href="https://commoncrawl.org">https://commoncrawl.org</a>
            </Typography>
          </li>
        </ul>
      </div>
      <h2 className={classes.sectionHeadings}>
        Frequency metrics
      </h2>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        In a chronological data set, word frequency usage is illuminating for
        tracking historical events and shifting cultural trends over time as the
        figure below illustrates.
      </Typography>
      <img
        src="/about/nyt-normalized-word-frequency.png"
        alt="Charts displaying word use frequency by the New York Times newspaper"
        className={classes.sectionImage}
      />
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        The frequency counts served by the app were estimated by tokenizing
        articles’ text into unigrams (i.e. single words). Currently, the app does
        not support querying of bigrams (i.e. New York). We hope to provide this
        feature in the future. Several metrics were computed for each word: The
        yearly absolute count of a word in an outlet represents the number of
        times the word occurs in headlines and body texts of all articles within
        a given year. The frequency of a single word in an outlet on any given
        year was estimated by dividing the count of all occurrences of the word
        in all articles of that year by the total count of all words in all
        articles of that year. The rank of a word in a year for a given outlet
        represents the frequency rank of a word in the entire vocabulary of that
        year.
      </Typography>
      <h2 className={classes.sectionHeadings}>
        Latent associations
      </h2>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        Word embeddings are language models trained on a large corpus of text
        that generate as output mappings from words to vector representations or
        word embeddings. These embeddings are determined by the contexts in which
        words frequently appear in the corpus. The main property of embedding
        vectors is that they encapsulate the semantic and syntactic roles with
        which word are used in the corpus of text on which the embedding model
        was trained. Embedding models can also be used as a proxy to measure
        latent associations between pairs of words in a corpus of text. Thus,
        this tool can be useful for the sociological analysis of culture as the
        following figure illustrates.
      </Typography>
      <img
        src="/about/nyt-association-between-words.png"
        alt="Charts displaying word pair associations in the New York Times newspaper"
        className={classes.sectionImage}
      />
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        The embedding models available in the Latent associations tab are
        word2vec models trained on news and opinion articles content at five
        years time intervals. For training the word embedding models the
        following parameters were used: vector dimensions=300, window size=10,
        negative sampling=10, down sampling frequent words = 0.0001, minimum
        frequency count for inclusion in vocabulary = 5, number of training
        iterations (epochs) through the corpus=5. The exponent used to shape the
        negative sampling distribution was 0.75.
      </Typography>
      <h2 className={classes.sectionHeadings}>
        Aside
      </h2>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        This final bit has nothing to do with textual analytics. The academic
        behind this project has been interested for many years in the creation of
        open source accessibility software for users with severe motor or
        cognitive impairment. Together with students, we have created a number of
        free software tools to help people with limited financial means interact
        with technology. If you know someone in such circumstances, perhaps he or
        she could benefit from the tools available in the following resource we
        have created.
      </Typography>
      <div className={classes.sectionDiv}>
        <Typography variant="body1" className={classes.linkText} color="primary">
          <a href="https://accessibilitysoftwarehub.github.io/software.html">
            https://accessibilitysoftwarehub.github.io/software.html
          </a>
        </Typography>
      </div>
    </>
  );
}

export default AboutSection;
