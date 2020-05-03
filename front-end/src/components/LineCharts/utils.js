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
