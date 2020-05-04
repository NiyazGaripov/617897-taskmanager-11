import {AbstractComponent} from './abstract-component.js';

const createNoTaskListComponent = () => {
  return (
    `<p class="board__no-tasks">Click «ADD NEW TASK» in menu to create your first task</p>`
  );
};

class NoTaskList extends AbstractComponent {
  getTemplate() {
    return createNoTaskListComponent();
  }
}

export {NoTaskList};
