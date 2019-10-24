import React from 'react';

export const createTooltip = (classes, items) => ({ active, payload, label }) => {
    if (active) {
      return (
        <div className={classes.tooltip}>
          <h2>{label}</h2>
          {items.map(item => (
            <p className={classes.tooltipLabel} key={item.title}>
              <span className={classes.tooltipLabelFirstWord}>{item.title}:</span>
              {payload[0].payload[item.key]}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };