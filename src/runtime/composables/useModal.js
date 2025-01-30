import { useState, useId } from "#imports";
import { v4 } from "uuid"

export default function ({
  name = "",
  initialData = null,
  initialIsActive = false,
  index = null,
}) {
  const uIndex = index || v4()

  const uName = name || useId();

  const isActive = useState(`${uName}-${uIndex}-modal-active`, () => initialIsActive);

  const data = useState(`${uName}-${uIndex}-modal-data`, () => initialData);

  const events = useState(`${uName}-${uIndex}-modal-events`, () => events);

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
