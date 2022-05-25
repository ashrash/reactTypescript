import { columnSchema, Hobby } from "../models";
import { MdDelete } from 'react-icons/Md';
import Types from '../state/ducks/user/types';

export const mainTable: columnSchema[] = [{
    displayName: 'User Hobbies',
    selector: '',
}]

export const hobbyTable: columnSchema[] = [
    {
        displayName: '_id',
        selector: '_id',
        identity: true,
        display: false,
    },
    {
        displayName: 'Passion Level',
        selector: 'passionLevel',
        type: 'input'
    },
    {
        displayName: 'Name',
        selector: 'name',
        type: 'input'
    },
    {
        displayName: 'Year',
        selector: 'year',
        type: 'input'
    },
    {
        displayName: 'Add',
        selector: '',
        type: 'button',
        headerAction: Types.ADD_USER,
        cellAction: '',
        cellIcon: MdDelete,
    }
];

export const userTable: columnSchema[] = [
    {
        displayName: 'id',
        selector: '_id',
        identity: true,
        display: false,
    },
    {
        displayName: 'Name',
        type: 'input',
        selector: 'name',
    },
    {
        displayName: 'Add',
        selector: '',
        type: 'button',
        headerAction: Types.ADD_USER,
        cellAction: '',
        cellIcon: MdDelete,
    }
];


export const hobbyData: Hobby[] = [
   {
      _id: "628e5ae6103452ca399a9c56",
      name: "Diving",
      passionLevel: "High",
      year: 2022,
    },
    {
      _id: "628e5af0103452ca399a9c5a",
      name: "Reading",
      passionLevel: "Low",
      year: 2022,
    }
];