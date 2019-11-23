/* eslint-disable react/prop-types */
import React from 'react';

/**
 * A tooltip factory for creating tooltips dynamicaly
 *
 * @param {Object} classes Classes to apply to the tooltip
 * @param {Object[]} items The items to render on the tooltip
 * @returns {Element}
 */
export const createTooltip = (classes, items) => {
  const ToolTip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className={classes.tooltip}>
          <h2>{label}</h2>
          {items.map(item => {
            let payloadItem = payload[0].payload[item.key];
            if (item.formatFunction)
              payloadItem = item.formatFunction(payloadItem);
            return (
              <p className={classes.tooltipLabel} key={item.title}>
                <span className={classes.tooltipLabelFirstWord}>
                  {item.title}
                  :
                </span>
                {payloadItem}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };
  return ToolTip;
};
