import { useState, useId, getCurrentInstance, watch } from "#imports";

export default ({
  id,
  min = -1_000_000_000,
  max = 1_000_000_000,
  fixed = 10,
  step = 1,
  defaultValue = "0",
  onUpdate = () => { },
}) => {
  const uid = id || useId();

  const instance = getCurrentInstance();

  const clearValue = useState(uid + "-clear-value", () => defaultValue)
  const modelValue = useState(uid, () => defaultValue);

  const getStepped = (val, step) => {
    if (!step) return val;

    return Math.round(val / step) * step;
  };

  const cleanAndFormatNumberString = (input) => {
    // Удаляем все символы, кроме цифр, знака отрицания, запятой и точки
    let cleanedInput = fixed
      ? input.replace(/[^0-9\-,.]/g, "")
      : input.replace(/[^0-9\-]/g, "");

    if (cleanedInput == ".") {
      return "0.";
    }

    if (cleanedInput === "-" || cleanedInput === "") {
      return cleanedInput; // Позволяем минус и пустую строку
    }

    // Заменяем запятую на точку
    cleanedInput = cleanedInput.replace(",", ".");

    // Удаляем лишние точки, оставляя только первую
    cleanedInput = cleanedInput.replace(/(\..*?)\..*/g, "$1");

    // Удаляем лишние минусы, кроме первого
    cleanedInput = cleanedInput.replace(/(?!^)-/g, "");

    if (cleanedInput[0] == "-" && cleanedInput[1] == ".") {
      return "-0.";
    }

    if (
      cleanedInput.slice(0, 2) === "-0" &&
      cleanedInput[2] &&
      cleanedInput[2] !== "."
    ) {
      return cleanedInput[2];
    }

    if (cleanedInput === "0" || cleanedInput === "-0") {
      return cleanedInput; // Позволяем только один 0
    }

    // Удаляем ведущие нули
    cleanedInput = cleanedInput.replace(/^0+(?=\d)/, "");
    cleanedInput = cleanedInput.replace(/^-0+/, "-0");

    // Ограничиваем значение минимальным и максимальным
    const numValue = parseFloat(cleanedInput);
    if (numValue < min) {
      return String(min).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    if (numValue > max) {
      return String(max).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    // Форматируем число с пробелами между десятками
    const parts = cleanedInput.split("."); // Разделяем целую и дробную часть
    let integerPart = parts[0];

    // Разделяем целую часть на группы с использованием нужного разделителя
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    if (parts.length == 1) {
      return integerPart;
    }

    const decimalPart = parts[1].slice(0, fixed); // Если дробная часть есть, оставляем её

    // Объединяем целую и дробную часть
    return `${integerPart}.${decimalPart}`;
  };

  const update = (event) => {
    const numberValue = event.target.value.replace(/[^0-9\-,.]/g, "");

    const value = String(getStepped(numberValue, step));

    const newValue = cleanAndFormatNumberString(value); // Форматируем, но не обновляем modelValue сразу

    onUpdate?.(newValue) || (() =>{
      const number = +newValue.replace(/[^0-9\-,.]/g, '')
      clearValue.value = number
    })();

    return newValue;
  };

  const onInput = (event) => {
    const value = event.target.value;
    const newValue = cleanAndFormatNumberString(value); // Форматируем, но не обновляем modelValue сразу

    modelValue.value = newValue; // Обновляем значение только после обработки

    instance.proxy.$forceUpdate();

    update(event);
  };

  const onBlur = (event) => {
    modelValue.value = update(event);
  };

  onBlur({
    target: {
      value: String(modelValue.value),
    },
  });

  watch(() => clearValue.value, () => {
    onBlur({
      target: {
        value: String(clearValue.value)
      }
    })
  })

  return {
    modelValue,
    clearValue,
    onInput,
    onBlur,
    on: {
      input: onInput,
      blur: onBlur
    },
    bind: {
      value: modelValue.value,
      onInput,
      onBlur
    }
  };
};
