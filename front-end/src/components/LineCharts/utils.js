/* eslint-disable react/prop-types */
import React from 'react';
import Square from '@material-ui/icons/Stop';
import Circle from '@material-ui/icons/FiberManualRecord';
import Star from '@material-ui/icons/Star';
import Cross from '@material-ui/icons/Add';
import Triangle from '@material-ui/icons/ChangeHistory';

/**
 * A tooltip factory for creating tooltips dynamicaly
 *
 * @param {Object} classes Classes to apply to the tooltip
 * @param {Object[]} items The items to render on the tooltip
 * @returns {Element}
 */
export const createTooltip = (classes, items, words, mediaOutlets) => {
  const ToolTip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className={classes.tooltip}>
          <h3>{label}</h3>
          {items.map(item => {
            return mediaOutlets.map(mediaOutlet => {
              return words.map(word => {
                let payloadItem =
                  payload[0].payload[mediaOutlet + word + item.key];
                if (item.formatFunction)
                  payloadItem = item.formatFunction(payloadItem);
                if (payloadItem) {
                  return (
                    <p className={classes.tooltipLabel} key={item.title}>
                      <span className={classes.tooltipLabelFirstWord}>
                        {`${mediaOutlet} - ${word}: `}
                      </span>
                      {Math.round(payloadItem * 1000000) / 1000000}
                    </p>
                  );
                }
              });
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
 * @param {Object[]} mediaOutlets
 * @param {String} YAxisKey
 * @returns {Element}
 */
export const createLegendPayload = (
  data,
  words,
  mediaOutlets,
  YAxisKey,
  allMediaOutlets,
  displayOption,
) => {
  const legendItems = [];
  for (let yearData of data.data) {
    for (let [index, mediaOutlet] of mediaOutlets.entries()) {
      for (let word of words) {
        if (Object.keys(yearData).includes(mediaOutlet + word + YAxisKey)) {
          if (
            legendItems.findIndex(item => item.id === mediaOutlet + word) === -1
          ) {
            legendItems.push({
              id: mediaOutlet + word,
              value:
                allMediaOutlets.find(obj => obj.value === mediaOutlet).name +
                ' - ' +
                word,
              color:
                displayOption === 'byWord'
                  ? stringToColour(mediaOutlet)
                  : stringToColour(word),
              type: icons[displayOption === 'byWord' ? 0 : index].legend,
            });
          }
        }
      }
    }
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
 * @param {Object[Object]} Mappings of mediaoutlet abbrivations to fullnames
 * @returns {Object[]}
 */
export function multipleDatasets(dataset, allMediaOutlets) {
  let result = [];
  dataset.map(wordDataset => {
    for (const mediaOutlet in wordDataset.data) {
      let mediaOutletData = [];
      wordDataset.data[mediaOutlet].map(wordData => {
        // Creating keys for the year data using using the media outlet and word.
        let yearObject = { year: wordData.year };
        yearObject[mediaOutlet + wordDataset.word + 'rank'] = wordData.rank;
        yearObject[mediaOutlet + wordDataset.word + 'count'] = wordData.count;
        yearObject[mediaOutlet + wordDataset.word + 'freq'] = wordData.freq;
        yearObject[mediaOutlet + wordDataset.word + 'word'] = wordDataset.word;
        yearObject[mediaOutlet + wordDataset.word + 'mediaOutlet'] = mediaOutlet;
        mediaOutletData.push(yearObject);
      });
      // Add the new result
      let fullName = allMediaOutlets.find(obj => obj.value === mediaOutlet).name;
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
  dataset.map(wordDataset => {
    for (const mediaOutlet in wordDataset.data) {
      wordDataset.data[mediaOutlet].map(wordData => {
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
        yearObject[mediaOutlet + wordDataset.word + 'rank'] = wordData.rank;
        yearObject[mediaOutlet + wordDataset.word + 'count'] = wordData.count;
        yearObject[mediaOutlet + wordDataset.word + 'freq'] = wordData.freq;
        yearObject[mediaOutlet + wordDataset.word + 'word'] = wordDataset.word;
        yearObject[mediaOutlet + wordDataset.word + 'mediaOutlet'] = mediaOutlet;
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
 * @param {Object[Object]} Mappings of mediaoutlet abbrivations to fullnames
 * @returns {Object[]}
 */
export function byOutletDataset(dataset, allMediaOutlets) {
  let result = [];
  dataset.map(wordDataset => {
    // Title and data to be appended to result
    let currentMediaOutlet = '';
    let mediaOutletData = [];
    for (const mediaOutlet in wordDataset.data) {
      let yearObject;
      mediaOutletData = [];
      currentMediaOutlet = mediaOutlet;

      wordDataset.data[mediaOutlet].map(wordData => {
        // Get a reference to the current media outlet data if it already exists.
        let mediaOutletInResult = result.find(
          obj =>
            obj.title ===
            allMediaOutlets.find(obj => obj.value === currentMediaOutlet).name,
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
        yearObject[mediaOutlet + wordDataset.word + 'rank'] = wordData.rank;
        yearObject[mediaOutlet + wordDataset.word + 'count'] = wordData.count;
        yearObject[mediaOutlet + wordDataset.word + 'freq'] = wordData.freq;
        yearObject[mediaOutlet + wordDataset.word + 'word'] = wordDataset.word;
        yearObject[mediaOutlet + wordDataset.word + 'mediaOutlet'] = mediaOutlet;
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
        obj =>
          obj.title ===
          allMediaOutlets.find(obj => obj.value === currentMediaOutlet).name,
      );
      // Similar to above. Only add to result if not already there, a reference has
      // been edited and doesn't need added again.
      if (!resultMediaOutlet) {
        let fullName = allMediaOutlets.find(obj => obj.value === mediaOutlet)
          .name;
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
  dataset.map(wordDataset => {
    for (const mediaOutlet in wordDataset.data) {
      wordDataset.data[mediaOutlet].map(wordData => {
        // Creating keys for the year data using using the media outlet and word.
        let yearObject = { year: wordData.year };
        yearObject[mediaOutlet + wordDataset.word + 'rank'] = wordData.rank;
        yearObject[mediaOutlet + wordDataset.word + 'count'] = wordData.count;
        yearObject[mediaOutlet + wordDataset.word + 'freq'] = wordData.freq;
        yearObject[mediaOutlet + wordDataset.word + 'word'] = wordDataset.word;
        yearObject[mediaOutlet + wordDataset.word + 'mediaOutlet'] = mediaOutlet;
        // Check if there is already a chart for the current word
        let wordObject = result.find(obj => obj.title === wordDataset.word);
        // If there is not a chart
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
  let summaryObject = {
    title: 'Summary',
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

    yearRangeObject['association' + association.media_outlet] =
      association.association;
    yearRangeObject['mediaOutlet' + association.media_outlet] =
      association.media_outlet;
  }
  summaryObject.data.sort(
    (x, y) =>
      Number(x.yearRange.split('-')[0]) - Number(y.yearRange.split('-')[0]),
  );
  return summaryObject;
}

/**
 * Structure a latent association dataset for by outlet chart display
 *
 * @param {Object} dataset Dataset to alter
 * @param {Object[Object]} Mappings of mediaoutlet abbrivations to fullnames
 * @returns {Object[]}
 */
export function byOutletLatentAssociationDatasets(
  dataset,
  allMediaOutlets,
  outlet,
) {
  let summaryObject = {
    title: '',
    data: [],
  };
  let outletData = dataset.map(obj =>
    obj.media_outlet === outlet ? obj : null,
  );
  for (let datum of outletData) {
    if (datum) {
      summaryObject.data.push({
        yearRange: datum.yearRange,
        ['association' + outlet]: datum.association,
        ['mediaOutlet' + outlet]: datum.media_outlet,
      });
    }
  }
  summaryObject.title = allMediaOutlets.find(obj => obj.value === outlet).name;
  summaryObject.data.sort(
    (x, y) =>
      Number(x.yearRange.split('-')[0]) - Number(y.yearRange.split('-')[0]),
  );
  return summaryObject;
}


/**
 * A legend item factory for creating latent association legend items dynamicaly
 *
 * @param {Object} data Data being used for the chart
 * @param {Object[]} mediaOutlets
 * @returns {Element}
 */
export const createLatentAssociationLegendPayload = (
  data,
  mediaOutlets,
  allMediaOutlets,
) => {
  const legendItems = [];
  for (let yearData of data.data) {
    for (let mediaOutlet of mediaOutlets) {
      if (Object.keys(yearData).includes("association"+mediaOutlet)) {
        if (
          legendItems.findIndex(item => item.id === mediaOutlet) === -1
        ) {
          legendItems.push({
            id: mediaOutlet,
            value:
              allMediaOutlets.find(obj => obj.value === mediaOutlet).name,
            color: stringToColour(mediaOutlet)
          });
        }
      }
    }
  }
  return legendItems;
};