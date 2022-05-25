import { columnSchema, Hobby } from "../models";
import { MdDelete } from 'react-icons/Md';
import Types from '../state/ducks/user/types';
import hobbyTypes from '../state/ducks/hobby/types';

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
        headerAction: hobbyTypes.ADD_HOBBY,
        cellAction: hobbyTypes.DELETE_HOBBY,
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
        clickable: true,
    },
    {
        displayName: 'Add',
        selector: '',
        type: 'button',
        headerAction: Types.ADD_USER,
        cellAction: Types.DELETE_USER,
        cellIcon: MdDelete,
    }
];
