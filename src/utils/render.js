const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const renderComponent = (container, component, place = `beforeend`) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const replaceComponent = (parent, newComponent, oldComponent) => {
  parent.replaceChild(newComponent, oldComponent);
};

const removeComponent = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {RenderPosition, renderComponent, createElement, replaceComponent, removeComponent};
