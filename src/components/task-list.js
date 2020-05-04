import {AbstractComponent} from './abstract-component.js';

const createTaskListComponent = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

class TaskList extends AbstractComponent {
  getTemplate() {
    return createTaskListComponent();
  }
}

export {TaskList};
