export default function triggerEvent(element, event) {
  const newEvent = new event.constructor(event.type, event);
  if (document.createEvent) {
    element.dispatchEvent(newEvent);
  } else {
    element.fireEvent("on" + event.eventType, newEvent);
  }
}
