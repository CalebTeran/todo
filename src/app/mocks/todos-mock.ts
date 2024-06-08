import { ITodoListItem } from '../core/interfaces/todo-interface';

export const TodoList: any = [
  {
    id: '1',
    title: 'Review Figma Design',
    completed: true,
    createdAt: new Date(),
    completedAt: new Date(),
  },
  {
    id: '2',
    title:
      'Create a component and get the to-do list data from the list.service.ts',
    completed: false,
    createdAt: new Date(),
    completedAt: new Date(),
    subTodos: [
      {
        id: '2a',
        title:
          'Make sure the items are ordered by the dateCreated value (newest items should appear at the bottom of the list)',
        completed: false,
        createdAt: new Date(),
        fathersIds: ['2'],
      },
    ],
  },
  {
    id: '3',
    title: 'Render the list in your component',
    completed: false,
    createdAt: new Date(),
    completedAt: new Date(),
    subTodos: [
      {
        id: '3a',
        title:
          'Child-level to-dos should be nested under their parent to-do item.',
        completed: false,
        createdAt: new Date(),
        fathersIds:['3']
      },
    ],
  },
  {
    id: '4',
    title:
      'Add the ability for the user to add new to-do items or sub to-do items',
    completed: false,
    createdAt: new Date(),
    completedAt: new Date(),
  },
  {
    id: '5',
    title:
      'Enable toggling each to-do item as completed. You do not need to persist the component state.',
    completed: false,
    createdAt: new Date(),
    subTodos: [
      {
        id: '3a',
        title:
          'A completed to-do item should look like the first item in the Figma',
        completed: true,
        createdAt: new Date(),
        fathersIds:['5']
      },
      {
        id: '3b',
        title:
          'Toggling a to-do item complete at the top level should automatically mark the child-level to-dos complete',
        completed: false,
        createdAt: new Date(),
        completedAt: new Date(),
        fathersIds:['5']
      },
    ],
  },
  {
    id: '6',
    title: 'Submit this StackBlitz',
    completed: false,
    createdAt: new Date(),
    subTodos: [
      {
        id: '4a',
        title: 'Click “Share” at the top of the page ',
        completed: false,
        createdAt: new Date(),
        completedAt: new Date(),
        fathersIds:['6']
      },
      {
        id: '4b',
        title:
          'Copy the “Editor URL” and make sure the visibility is set to Public',
        completed: false,
        createdAt: new Date(),
        completedAt: new Date(),
        fathersIds:['6']
      },
      {
        id: '4c',
        title: 'Send the link to eric.rowe@stukent.com',
        completed: false,
        createdAt: new Date(),
        fathersIds:['6']
      },
    ],
  },
  {
    id: '7',
    title: '(Optional) Bonus Tasks',
    completed: false,
    createdAt: new Date(),
    subTodos: [
      {
        id: '5a',
        title: 'Demonstrate proper parent/child component architecture',
        completed: false,
        createdAt: new Date(),
        fathersIds:['7']
      },
      {
        id: '5b',
        title: 'Ensure responsiveness across a wide range of screen sizes',
        completed: false,
        createdAt: new Date(),
        completedAt: new Date(),
        fathersIds:['7']
      },
      {
        id: '5c',
        title: 'Add ability to delete items',
        completed: false,
        createdAt: new Date(),
        fathersIds:['7']
      },
      {
        id: '5d',
        title:
          'Add ability to collapse a to-do item to show only the parent item',
        completed: false,
        createdAt: new Date(),
        fathersIds:['7']
      },
      {
        id: '5e',
        title:
          'Add an animation when marking an item as completed (get creative)',
        completed: false,
        createdAt: new Date(),
        completedAt: new Date(),
        fathersIds:['7']
      },
      {
        id: '5f',
        title:
          'Add a dropdown at the top to select a different sort order for the list. The options should include Date Created, Completed, or Alphabetical.',
        completed: false,
        createdAt: new Date(),
        completedAt: new Date(),
        fathersIds:['7']
      },
      {
        id: '5g',
        title: 'Add an option to toggle dark mode',
        completed: false,
        createdAt: new Date(),
        fathersIds:['7']
      },
    ],
  },
];
