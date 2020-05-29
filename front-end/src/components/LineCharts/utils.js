/* eslint-disable react/prop-types */
import React from 'react';
import Square from '@material-ui/icons/Stop';
import Circle from '@material-ui/icons/FiberManualRecord';
import Star from '@material-ui/icons/Star';
import Cross from '@material-ui/icons/Add';
import Triangle from '@material-ui/icons/ChangeHistory';

/**
 * Normalise a frequency dataset using min-max normalisation.
 *
 * Data is normaised between years of an outlet starting at the given year or
 * first year in dataset if the given year does not exist.
 *
 * @param {Object[]} datasets
 * @param {Number}  yearFrom Year to normalise the data from.
 * @param {Number}  yearTo
 * @param {String}  yAxisKey Key to normalise for
 * @returns {Object[]}
 */
export const normaliseDatasets = (normalisedDatasets, datasets, yearFrom, yearTo, yAxisKey) => {
  normalisedDatasets = JSON.parse(JSON.stringify(datasets));
  Object.values(datasets).forEach(wordData => {
    Object.values(wordData.data).forEach(outletData => {
      let firstYearData = outletData.find(obj => obj.year === String(yearFrom));
      if (!firstYearData) {
        firstYearData = Object.values(outletData)[0];
      }
      let min = firstYearData[yAxisKey];
      let max = firstYearData[yAxisKey];
      // Find the actual maximum and minimum
      Object.values(outletData).forEach(yearData => {
        if (yearData.year >= yearFrom && yearData.year <= yearTo) {
          if (yearData[yAxisKey] > max) max = yearData[yAxisKey];
          if (yearData[yAxisKey] < min) min = yearData[yAxisKey];
        }
      });
      // Normalise using the maximum and minimum
      Object.values(outletData).forEach(yearData => {
        yearData[yAxisKey] = (yearData[yAxisKey] - min) / (max - min);
      });
    });
  });
};

/**
 * A tooltip factory for creating tooltips dynamicaly
 *
 * @param {Object} classes Classes to apply to the tooltip
 * @param {Object[]} items The items to render on the tooltip
 * @returns {Element}
 */
export const createTooltip = (
  classes,
  words,
  outlets,
  displayOption,
  yAxisKey,
  mediaOutlets,
) => {
  const ToolTip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className={classes.tooltip}>
          <h3>{label}</h3>
          {outlets.map(outlet => {
            return words.map(word => {
              const formattedOutlet = mediaOutlets.find(
                obj => obj.value === outlet,
              ).title;

              const formattedWord = word
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              let payloadItem = payload[0].payload[outlet + word + yAxisKey];

              let tooltipLabel = '';
              switch (displayOption) {
                case 'multiple':
                  tooltipLabel = '';
                  break;
                case 'byWord':
                  tooltipLabel = formattedOutlet + ': ';
                  break;
                case 'byOutlet':
                  tooltipLabel = formattedWord + ': ';
                  break;
                default:
                  tooltipLabel = `${formattedOutlet} - ${formattedWord}: `;
              }

              if (payloadItem !== null) {
                return (
                  <p
                    style={{
                      color:
                        displayOption === 'byWord'
                          ? stringToColour(outlet)
                          : stringToColour(word),
                    }}
                    className={classes.tooltipLabel}
                    key={word + outlets + yAxisKey}
                  >
                    <span
                      style={{
                        color:
                          displayOption === 'byWord'
                            ? stringToColour(outlet)
                            : stringToColour(word),
                      }}
                      className={classes.tooltipLabelFirstWord}
                    >
                      {tooltipLabel}
                    </span>
                    {payloadItem}
                  </p>
                );
              } else {
                return null;
              }
            });
          })}
        </div>
      );
    }
    return null;
  };
  return ToolTip;
};

const icons = {
  0: { legend: 'circle', icon: Circle },
  1: { legend: 'star', icon: Star },
  2: { legend: 'cross', icon: Cross },
  3: { legend: 'square', icon: Square },
  4: { legend: 'triangle', icon: Triangle },
};

/**
 * A legend item factory for creating legend items dynamicaly
 *
 * @param {Object} data Data being used for the chart
 * @param {Object[]} words
 * @param {Object[]} outlets
 * @param {String} YAxisKey
 * @returns {Element}
 */
export const createLegendPayload = (
  data,
  words,
  outlets,
  YAxisKey,
  mediaOutlets,
  displayOption,
) => {
  const legendItems = [];
  if (displayOption !== 'multiple') {
    data.forEach(yearData => {
      for (let [index, outlet] of outlets.entries()) {
        words.forEach(word => {
          if (Object.keys(yearData).includes(outlet + word + YAxisKey)) {
            if (!legendItems.some(item => item.id === outlet + word)) {
              const formattedOutlet = mediaOutlets.find(
                obj => obj.value === outlet,
              ).title;

              const formattedWord = word
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              const legendItem = {
                id: outlet + word,
                color:
                  displayOption === 'byWord'
                    ? stringToColour(outlet)
                    : stringToColour(word),
                type: icons[displayOption === 'byWord' ? 0 : index].legend,
                value: '',
              };

              switch (displayOption) {
                case 'byOutlet':
                  legendItem.value = formattedWord;
                  break;
                case 'byWord':
                  legendItem.value = formattedOutlet;
                  break;
                default:
                  legendItem.value = formattedOutlet + ' - ' + formattedWord;
              }

              legendItems.push(legendItem);
            }
          }
        });
      }
    });
  }
  return legendItems;
};

/**
 * A deterministic converter of a string to a hexidecimal colour
 *
 * @param {String} str
 * @returns {String}
 */
export const stringToColour = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
};

/**
 * Create an icon for each outlet
 *
 * @param {String} str
 * @returns {String}
 */
export const CustomizedDot = props => {
  const { cx, cy, stroke, value, number } = props;
  const iconData = value ? icons[number] : null;
  const Icon = iconData ? iconData.icon : null;

  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 1024 1024">
      {Icon && <Icon style={{ color: stroke }} />}
    </svg>
  );
};

/**
 * Structure a dataset for multiple chart display
 *
 * @param {Object} dataset Dataset to alter
 * @param {Object[]} mediaOutets Mapping of outlet abbreviation to fullname
 * @returns {Object[]}
 */
export function multipleDatasets(dataset, mediaOutlets) {
  let result = [];
  dataset.forEach(wordDataset => {
    for (let outlet in wordDataset.data) {
      let mediaOutletData = [];
      wordDataset.data[outlet].forEach(wordData => {
        // Creating keys for the year data using using the media outlet and word.
        let yearObject = { year: wordData.year };
        yearObject[outlet + wordDataset.word + 'rank'] = wordData.rank;
        yearObject[outlet + wordDataset.word + 'count'] = wordData.count;
        yearObject[outlet + wordDataset.word + 'freq'] = wordData.freq;
        yearObject[outlet + wordDataset.word + 'word'] = wordDataset.word;
        yearObject[outlet + wordDataset.word + 'mediaOutlet'] = outlet;
        mediaOutletData.push(yearObject);
      });
      // Add the new result
      let fullName = mediaOutlets.find(obj => obj.value === outlet).title;
      result.push({
        title: wordDataset.word + ' - ' + fullName,
        data: mediaOutletData,
      });
    }
  });
  return result;
}

/**
 * Structure a dataset for a single chart display
 *
 * @param {Object} dataset Dataset to alter
 * @returns {Object[]}
 */
export function singleDataset(dataset) {
  // The object that will contain all the data. This could be wrapped in brackets at
  // the final return and result could be removed but I think it is clearer and
  // consistant with the other functions when kept separate.
  let result = [];
  let summaryObject = {
    title: 'Summary',
    data: [],
  };
  dataset.forEach(wordDataset => {
    for (let outlet in wordDataset.data) {
      wordDataset.data[outlet].forEach(wordData => {
        // Check if the year already exists in the summary object
        let yearObject = summaryObject.data.find(
          obj => obj.year === wordData.year,
        );
        // The year doesn't exist, set the year object to a new object for the year.
        if (!yearObject) {
          yearObject = { year: wordData.year };
          summaryObject.data.push(yearObject);
        }
        // Add to year object using, media source and word in the keys.
        yearObject[outlet + wordDataset.word + 'rank'] = wordData.rank;
        yearObject[outlet + wordDataset.word + 'count'] = wordData.count;
        yearObject[outlet + wordDataset.word + 'freq'] = wordData.freq;
        yearObject[outlet + wordDataset.word + 'word'] = wordDataset.word;
        yearObject[outlet + wordDataset.word + 'mediaOutlet'] = outlet;
      });
    }
  });
  summaryObject.data.sort((x, y) => x.year - y.year);
  result.push(summaryObject);
  return result;
}

/**
 * Structure a dataset for by outlet charts
 *
 * @param {Object} dataset Dataset to alter
 * @param {Object[]} mediaOutets Mapping of outlet abbreviation to fullname
 * @returns {Object[]}
 */
export function byOutletDataset(dataset, mediaOutlets) {
  let result = [];
  dataset.forEach(wordDataset => {
    // Title and data to be appended to result
    for (let outlet in wordDataset.data) {
      let yearObject;
      let mediaOutletData = [];
      wordDataset.data[outlet].forEach(wordData => {
        // Get a reference to the current media outlet data if it already exists.
        let mediaOutletInResult = result.find(
          obj =>
            obj.title === mediaOutlets.find(obj => obj.value === outlet).title,
        );
        if (mediaOutletInResult) {
          mediaOutletData = mediaOutletInResult.data;
        }
        // Get a reference to the year data in media outlet data if it already exists.
        yearObject = mediaOutletData.find(obj => obj.year === wordData.year);
        if (!yearObject) {
          yearObject = { year: wordData.year };
          mediaOutletData.push(yearObject);
        }
        // Creating keys for the data using using the media outlet and word.
        yearObject[wordDataset.word + 'rank'] = wordData.rank;
        yearObject[wordDataset.word + 'count'] = wordData.count;
        yearObject[wordDataset.word + 'freq'] = wordData.freq;
        yearObject[wordDataset.word + 'word'] = wordDataset.word;
        yearObject[wordDataset.word + 'mediaOutlet'] = outlet;
      });

      // Check there is aready data for the particular year in the current media data.
      let yearDataObjectInMediaOutlet = mediaOutletData.find(
        obj => obj.year === yearObject.year,
      );
      // If there is no data already for the year, add the year object. If there was
      // already data, the year object would be a reference to an object within the
      // media outlet data array and wouldn't need to be appended.
      if (!yearDataObjectInMediaOutlet) {
        mediaOutletData.push(yearObject);
      }
      // Check if there is already data for the media outlet in result.
      let resultMediaOutlet = result.find(
        obj => obj.title === mediaOutlets.find(obj => obj.value === outlet).name,
      );
      // Similar to above. Only add to result if not already there, a reference has
      // been edited and doesn't need added again.
      if (!resultMediaOutlet) {
        let fullName = mediaOutlets.find(obj => obj.value === outlet).title;
        let newResultMediaOutlet = {
          title: fullName,
          data: mediaOutletData,
        };
        result.push(newResultMediaOutlet);
      }
    }
  });
  return result;
}

/**
 * Structure a dataset for by word charts
 *
 * @param {Object} dataset Dataset to alter
 * @returns {Object[]}
 */
export function byWordDataset(dataset) {
  let result = [];
  dataset.forEach(wordDataset => {
    for (let outlet in wordDataset.data) {
      wordDataset.data[outlet].forEach(wordData => {
        // Creating keys for the year data using using the media outlet and word.
        let yearObject = { year: wordData.year };
        yearObject[outlet + wordDataset.word + 'rank'] = wordData.rank;
        yearObject[outlet + wordDataset.word + 'count'] = wordData.count;
        yearObject[outlet + wordDataset.word + 'freq'] = wordData.freq;
        yearObject[outlet + wordDataset.word + 'word'] = wordDataset.word;
        yearObject[outlet + wordDataset.word + 'mediaOutlet'] = outlet;
        // Check if there is already a chart for the current word
        let wordObject = result.find(obj => obj.title === wordDataset.word);
        // If there is not already a chart
        if (!wordObject) {
          wordObject = { title: wordDataset.word, data: [] };
          result.push(wordObject);
        }
        // Add to the result for the currant word
        wordObject.data.push(yearObject);
      });
    }
  });
  return result;
}

/**
 * Structure a latent association dataset for a single chart display
 *
 * @param {Object} dataset Dataset to alter
 * @returns {Object[]}
 */
export function singleLatentAssociationDataset(dataset) {
  if (!dataset) {
    return null;
  }

  let summaryObject = {
    title: dataset[0].media_outlet,
    data: [],
  };

  for (let association of dataset) {
    let yearRangeObject = summaryObject.data.find(
      obj => obj.yearRange === association.yearRange,
    );

    if (!yearRangeObject) {
      yearRangeObject = { yearRange: association.yearRange };
      summaryObject.data.push(yearRangeObject);
    }
    yearRangeObject['association'] = association.association;
    yearRangeObject['mediaOutlet'] = association.media_outlet;
  }
  summaryObject.data.sort(
    (x, y) =>
      Number(x.yearRange.split('-')[0]) - Number(y.yearRange.split('-')[0]),
  );
  return summaryObject;
}

/**
 * A legend item factory for creating latent association legend items dynamically
 *
 * @param {Object} data Data being used for the chart
 * @param {Object[]} mediaOutlets
 * @returns {Element}
 */
export const createLatentAssociationLegendPayload = (
  data,
  concept1,
  concept2,
  outlet,
) => {
  const legendItems = [];
  for (let yearData of data.data) {
    if (Object.keys(yearData).includes('association')) {
      if (legendItems.findIndex(item => item.id === outlet) === -1) {
        let concept1Formatted = concept1
          .map(item => item.charAt(0).toUpperCase() + item.substr(1))
          .join(', ');
        let concept2Formatted = concept2
          .map(item => item.charAt(0).toUpperCase() + item.substr(1))
          .join(', ');
        legendItems.push({
          id: outlet,
          value: `[${concept1Formatted}] & [${concept2Formatted}]`,
          color: stringToColour(outlet),
        });
      }
    }
  }
  return legendItems;
};
