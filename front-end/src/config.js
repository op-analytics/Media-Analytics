export default {
  apiUrl:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : process.env.REACT_APP_API_URL,
  siteTitle: 'Media-Analytics.org',
  yearRange: {
    from: 1970,
    to: 2020,
  },
  mediaOutlets: {
    frequency: [
      { title: 'New York Times', value: 'nyt' },
      { title: 'New York Post', value: 'nyp' },
      { title: 'The Guardian', value: 'guardian' },
      { title: 'Los Angeles Times', value: 'lat' },
    ],
    association: [
      { title: 'New York Times', value: 'nyt' },
      { title: 'New York Post', value: 'nyp' },
      { title: 'The Guardian', value: 'guardian' },
      { title: 'Los Angeles Times', value: 'lat' },
    ],
    sentiment: 'New York Times',
  },
  csvDownloadNames: {
    sentiment: 'ma-sentiment-analysis.csv',
    association: 'ma-latent-association.csv',
    frequency: 'ma-frequency.csv',
  },
  parameterLimits: {
    frequency: 4,
    association: 1,
    sentiment: 1,
  },
  csvDownloadHeaders: {
    // Frequency is not included due to the yAxisMetric being dynamic
    sentiment: [
      { label: 'media outlet', key: 'mediaOutlet' },
      { label: 'word', key: 'word' },
      { label: 'year', key: 'year' },
      { label: 'sentiment', key: 'sentiment' },
    ],
    association: [
      { label: 'media outlet', key: 'mediaOutlet' },
      { label: 'concept1', key: 'concept1' },
      { label: 'concept2', key: 'concept2' },
      { label: 'year range', key: 'yearRange' },
      { label: 'association', key: 'association' },
    ],
  },
  frequencyDisplayOptions: [
    { name: 'On a single chart', value: 'single' },
    { name: 'On individual charts', value: 'multiple' },
    { name: 'Grouped by media outlet', value: 'byOutlet' },
    { name: 'Grouped by word', value: 'byWord' },
  ],
  frequencyAxisMetrics: [
    { name: 'Frequency', value: 'freq' },
    { name: 'Count', value: 'count' },
    { name: 'Rank', value: 'rank' },
  ],
};
