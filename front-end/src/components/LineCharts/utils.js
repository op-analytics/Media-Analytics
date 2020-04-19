/* eslint-disable react/prop-types */
import React from 'react';

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
