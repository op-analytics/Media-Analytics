/* eslint-disable react/prop-types */
import Cross from '@material-ui/icons/Add';
import Triangle from '@material-ui/icons/ChangeHistory';
import Circle from '@material-ui/icons/FiberManualRecord';
import Star from '@material-ui/icons/Star';
import Square from '@material-ui/icons/Stop';
import React from 'react';

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
export const normaliseDatasets = (
  datasets,
  words,
  outlets,
  yearFrom,
  yearTo,
  yAxisKey,
) => {
  const normalisedDatasets = JSON.parse(JSON.stringify(datasets));
  outlets.forEach((outlet) => {
    words.forEach((word) => {
      const wordData = normalisedDatasets.filter(
        (wordDatum) => wordDatum.outlet === outlet && wordDatum.word === word,
      );
      const firstYearData =
        wordData.find((obj) => obj.year === String(yearFrom)) ||
        Object.values(wordData)[0];
      if (firstYearData) {
        let min = firstYearData[yAxisKey];
        let max = firstYearData[yAxisKey];
        // Find the actual maximum and minimum
        Object.values(wordData).forEach((yearData) => {
          if (yearData.year >= yearFrom && yearData.year <= yearTo) {
            if (yearData[yAxisKey] > max) max = yearData[yAxisKey];
            if (yearData[yAxisKey] < min) min = yearData[yAxisKey];
          }
        });
        // Normalise using the maximum and minimum
        Object.values(wordData).forEach((yearData) => {
          // eslint-disable-next-line no-param-reassign
          yearData[yAxisKey] = (yearData[yAxisKey] - min) / (max - min);
        });
      }
    });
  });
  return normalisedDatasets;
};

/**
 * A deterministic converter of a string to a hexidecimal colour
 * @param {String} str
 * @returns {String}
 */
export const stringToColour = (str) => {
  let hash = 0;
  [...str].forEach((_, i) => {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  });
  let colour = '#';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff;
    colour += `00${value.toString(16)}`.substr(-2);
  }
  return colour;
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
      const tooltipLines = [];
      outlets.forEach((outlet) => {
        words.forEach((word) => {
          const formattedOutlet = mediaOutlets.find(
            (obj) => obj.value === outlet,
          ).title;

          // Change first letter of the word to uppercase
          const formattedWord =
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

          let tooltipLabel = '';
          let tooltipData = '';
          let color = stringToColour(word);

          switch (displayOption) {
            case 'single':
              tooltipLabel = `${formattedOutlet} - ${formattedWord}: `;
              break;
            case 'byWord':
              tooltipLabel = `${formattedOutlet}: `;
              color = stringToColour(
                mediaOutlets.find((obj) => obj.value === outlet).title,
              );
              break;
            case 'byOutlet':
              tooltipLabel = `${formattedWord}: `;
              break;
            case 'multiple':
              tooltipLabel = '';
              tooltipData = payload[0]?.payload[yAxisKey];
              break;
            default:
              tooltipLabel = `${formattedOutlet} - ${formattedWord}: `;
          }

          tooltipData = payload[0]?.payload[outlet + word + yAxisKey];

          if (tooltipData) {
            tooltipLines.push({
              label: tooltipLabel,
              data: tooltipData,
              word,
              outlet,
              color,
            });
          }
        });
      });

      tooltipLines.sort((line1, line2) => line2.data - line1.data);

      return (
        <div className={classes.tooltip}>
          <h3>{label}</h3>
          {tooltipLines.map((line) => (
            <p
              style={{ color: line.color }}
              className={classes.tooltipLabel}
              key={line.word + line.outlet}
            >
              <span
                style={{ color: line.color }}
                className={classes.tooltipLabelFirstWord}
              >
                {line.label}
              </span>
              {line.data}
            </p>
          ))}
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
    data.forEach((yearData) => {
      outlets.forEach((outlet, index) => {
        words.forEach((word) => {
          if (Object.keys(yearData).includes(outlet + word + YAxisKey)) {
            if (!legendItems.some((item) => item.id === outlet + word)) {
              const formattedOutlet = mediaOutlets.find(
                (obj) => obj.value === outlet,
              ).title;

              // Change first letter of the word to uppercase
              const formattedWord =
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

              const legendItem = {
                id: outlet + word,
                color: stringToColour(word),
                type: 'circle',
                value: '',
              };

              switch (displayOption) {
                case 'single':
                  legendItem.value = `${formattedOutlet} - ${formattedWord}`;
                  legendItem.type = icons[index].legend;
                  break;
                case 'byOutlet':
                  legendItem.value = formattedWord;
                  break;
                case 'byWord':
                  legendItem.value = formattedOutlet;
                  legendItem.color = stringToColour(
                    mediaOutlets.find((obj) => obj.value === outlet).title,
                  );
                  break;
                default:
                  legendItem.value = `${formattedOutlet} - ${formattedWord}`;
              }

              legendItems.push(legendItem);
            }
          }
        });
      });
    });
  }
  return legendItems;
};

/**
 * Create an icon for each outlet
 *
 * @param {String} str
 * @returns {String}
 */
export const CustomizedDot = (props) => {
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
  const result = [];

  dataset.forEach((wordData) => {
    const title = `${
      mediaOutlets.find((obj) => obj.value === wordData.outlet).title
    } -
      ${wordData.word}`;

    const data = {
      word: wordData.word,
      outlet: wordData.outlet,
      [`${wordData.outlet + wordData.word}rank`]: wordData.rank,
      [`${wordData.outlet + wordData.word}count`]: wordData.count,
      [`${wordData.outlet + wordData.word}freq`]: wordData.freq,
    };

    let outlet = result.find((obj) => obj.title === title);

    if (!outlet) {
      outlet = {
        title,
        data: [],
      };
      result.push(outlet);
    }

    let yearData = outlet.data.find((obj) => obj.year === wordData.year);
    if (yearData === undefined) {
      yearData = { year: wordData.year };
      outlet.data.push(yearData);
    }
    Object.assign(yearData, data);

    // const outlet = result.find(obj => obj.title === title);

    // if (outlet) {
    //   outlet.data.push(data);
    // } else {
    //   result.push({
    //     title: title,
    //     data: [data],
    //   });
    // }
  });

  return result;
}

/**
 * Structure a dataset for a single chart display
 *
 * @param {Object[]} dataset Dataset to alter
 * @returns {Object}
 */
export function singleDataset(dataset) {
  const result = {
    title: 'Summary',
    data: [],
  };
  dataset.forEach((wordData) => {
    let yearData = result.data.find((obj) => obj.year === wordData.year);
    if (yearData === undefined) {
      yearData = { year: wordData.year };
      result.data.push(yearData);
    }
    const data = {
      word: wordData.word,
      outlet: wordData.outlet,
      [`${wordData.outlet + wordData.word}rank`]: wordData.rank,
      [`${wordData.outlet + wordData.word}count`]: wordData.count,
      [`${wordData.outlet + wordData.word}freq`]: wordData.freq,
    };
    Object.assign(yearData, data);
  });
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
  const result = [];

  dataset.forEach((wordData) => {
    const { title } = mediaOutlets.find((obj) => obj.value === wordData.outlet);

    const data = {
      word: wordData.word,
      outlet: wordData.outlet,
      [`${wordData.outlet + wordData.word}rank`]: wordData.rank,
      [`${wordData.outlet + wordData.word}count`]: wordData.count,
      [`${wordData.outlet + wordData.word}freq`]: wordData.freq,
    };

    let outlet = result.find((obj) => obj.title === title);

    if (!outlet) {
      outlet = {
        title,
        data: [],
      };
      result.push(outlet);
    }

    let yearData = outlet.data.find((obj) => obj.year === wordData.year);
    if (yearData === undefined) {
      yearData = { year: wordData.year };
      outlet.data.push(yearData);
    }
    Object.assign(yearData, data);
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
  const result = [];

  dataset.forEach((wordData) => {
    const title = wordData.word;

    const data = {
      word: wordData.word,
      outlet: wordData.outlet,
      [`${wordData.outlet + wordData.word}rank`]: wordData.rank,
      [`${wordData.outlet + wordData.word}count`]: wordData.count,
      [`${wordData.outlet + wordData.word}freq`]: wordData.freq,
    };

    let word = result.find((obj) => obj.title === title);

    if (!word) {
      word = {
        title,
        data: [],
      };
      result.push(word);
    }

    let yearData = word.data.find((obj) => obj.year === wordData.year);
    if (yearData === undefined) {
      yearData = { year: wordData.year };
      word.data.push(yearData);
    }
    Object.assign(yearData, data);
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
  if (dataset.length === 0) {
    return null;
  }

  const summaryObject = {
    title: dataset[0].outlet,
    data: [],
  };

  dataset.forEach((association) => {
    let yearRangeObject = summaryObject.data.find(
      (obj) => obj.yearRange === association.yearRange,
    );

    if (!yearRangeObject) {
      yearRangeObject = { yearRange: association.yearRange };
      summaryObject.data.push(yearRangeObject);
    }
    yearRangeObject.association = association.association;
    yearRangeObject.outlet = association.outlet;
  });

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
  data.forEach((yearData) => {
    if (Object.keys(yearData).includes('association')) {
      if (legendItems.findIndex((item) => item.id === outlet) === -1) {
        const concept1Formatted = concept1
          .map((item) => item.charAt(0).toUpperCase() + item.substr(1))
          .join(', ');
        const concept2Formatted = concept2
          .map((item) => item.charAt(0).toUpperCase() + item.substr(1))
          .join(', ');
        legendItems.push({
          id: outlet,
          value: `${concept1Formatted} & ${concept2Formatted}`,
          color: stringToColour(outlet),
        });
      }
    }
  });
  return legendItems;
};
