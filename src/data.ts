import type { Model, Param } from './components/ParamEditor/ParamEditor';

export const params: Param[] = [
  {
    id: 1,
    name: 'Название',
    type: 'string',
  },
  {
    id: 2,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 3,
    name: 'Длина',
    type: 'string',
  },
];
export const data: Model[] = [
  {
    paramValues: [
      {
        paramId: 1,
        value: 'Футболка',
      },
      {
        paramId: 2,
        value: 'повседневное',
      },
      {
        paramId: 3,
        value: 'макси',
      },
    ],
    colors: [],
  },
  {
    paramValues: [
      {
        paramId: 1,
        value: 'Куртка',
      },
      {
        paramId: 2,
        value: 'повседневное',
      },
      {
        paramId: 3,
        value: 'макси',
      },
    ],
    colors: [],
  },
  {
    paramValues: [
      {
        paramId: 1,
        value: 'Шорты',
      },
      {
        paramId: 2,
        value: 'повседневное',
      },
      {
        paramId: 3,
        value: 'макси',
      },
    ],
    colors: [],
  },
];
