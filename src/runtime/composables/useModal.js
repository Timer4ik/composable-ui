import { useState, useId } from "#imports";

export default function ({
  name = "",
  initialData = null,
  initialIsActive = false,
}) {
  const uName = name || useId();

  const isActive = useState(`${uName}-modal-active`, () => initialIsActive);

  const data = useState(`${uName}-modal-data`, () => initialData);

  const events = useState(`${uName}-modal-onsubmit`, () => ({}));

  const context = {
    name: uName,
    isActive,
    data,
    events,
    on,
    open,
    close,
    toggle,
    emit: emit,
  };

  function on(event, callback) {
    events.value[event] = callback;
    return context;
  }

  function open(_data) {
    if (_data !== undefined) data.value = _data;
    isActive.value = true;
    return context;
  }
  function close(_data) {
    if (_data !== undefined) data.value = _data;
    isActive.value = false;
    return context;
  }
  function toggle(_data) {
    if (_data !== undefined) data.value = _data;
    isActive.value = !isActive.value;
    return context;
  }

  function emit(name, ...attrs) {
    events.value[name](...attrs);
    return context;
  }

  return {
    open,
    close,
    isActive,
    toggle,
    name: uName,
    data: data,
    emit,
    on,
  };
}
