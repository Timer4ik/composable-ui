export const copy = (text) => {
  try {
    var input = document.createElement("textarea");
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document?.execCommand("copy");
    document.body.removeChild(input);
  } catch (error) {
    console.error("Copying failed", error);
  }
};

export const clearObjectFrom = (object, types = [undefined]) => {
  const newObject = {};

  Object.entries(object).map(([key, value]) => {
    if (!types.includes(value)) {
      newObject[key] = value;
    }
  });

  return newObject;
};

export const log = console.log;

export const isObject = (obj) => {
  return obj && typeof obj == "object" && !Array?.isArray(obj);
};

export function cloneDeep(obj) {
  if (isObject(obj)) {
    return JSON.parse(JSON.stringify(obj));
  }
  return obj;
}

export const debounce = (callback, delay) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const getBreadcrumps = (links) => {
  const pre = [];

  links.forEach((link, index) => {
    if (!link) return;
    link.isLink = true;
    pre.push(link);
    if (index < links.length - 1) {
      pre.push({ isSeparator: true });
    }
  });

  return pre.map((i) => {
    return {
      ...i,
      isSeparator: i.isSeparator,
    };
  });
};

export const getFileUrl = (file) => {
  return URL.createObjectURL(file);
};

export const getDottedText = (text, amount = 120) => {
  if (!text?.length) {
    return;
  }

  if (text?.length <= amount) {
    return text;
  }

  return text?.slice?.(0, amount) + "...";
};
export const isReachedBottom = (event) => {
  const isReachedBottom =
    event.target.scrollHeight -
    event.target.clientHeight -
    event.target.scrollTop <
    100;
  return isReachedBottom;
};

export const isConsistTarget = (element, target) => {
  if (element == target || element?.contains?.(target)) {
    return true;
  }
};

export const fileFormats = {
  'image/jpeg': 'image/jpeg',
  'image/png': 'image/png',
  'image/svg': 'image/svg',
  '.pdf': '.pdf',
  '.word': '.word',
  '.doc': '.doc',
  '.rtf': '.rtf',
  '.xls': '.xls',
  '.xlsx': '.xlsx',
}