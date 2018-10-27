'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const mqChange = function(mq, options) {
  if (mq.matches) {
    if (typeof options.entry === "function") {
      options.entry(mq);
    }
  } else {
    if (typeof options.exit === "function") {
      options.exit(mq);
    }
  }
  if (typeof options.both === "function") {
    return options.both(mq);
  }
};

const mediaCheck = function(options) {
  if (typeof window === 'undefined') return null;

  const mq = window.matchMedia(options.media);

  mq.addListener(function() {
    return mqChange(mq, options);
  });

  window.addEventListener("orientationchange", (function() {
    const orientationMQ = window.matchMedia(options.media);
    return mqChange(orientationMQ, options);
  }), false);

  return mqChange(mq, options);
};

exports.default = mediaCheck;
exports.mqChange = mqChange;