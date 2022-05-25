import * as React from "react";
import * as R from 'ramda';
import { columnSchema } from '../../models/table';
import './Table.scss';

type Props = {
    headers: columnSchema[];
    tableData: any;
    processAction?: Function;
    processRowClick?: Function;
    dataStatus?: string;
};

type State = {
    textInputState: any; 
  };

class Table extends React.Component<Props, State> {
    state: State = {
        textInputState: {},
    };

    handleTextChange = (col) => {
        return (event) => {
            this.setState((state) => {
                const newState = R.assocPath(['textInputState', R.prop('selector', col)], event.target.value , state);
                return newState;
            });
        };
    }

    handleButtonClick = (action) => {
        const { textInputState } = this.state;
        const  { processAction } = this.props;
        return () => processAction(action, textInputState);
    }

    renderHeader = (col: columnSchema) => {
        const { textInputState } = this.state;
        if(R.propOr(true, 'display', col)){
            switch(R.propOr('text', 'type', col)){
                case 'input': return <td><input value={R.prop(R.propOr('', 'selector', col), textInputState)} onChange={this.handleTextChange(col)} type="text" /></td>;
                case 'button': return <td><button onClick={this.handleButtonClick(col.headerAction)}>{R.propOr('', 'displayName', col)}</button></td>;
                case 'text': 
                default:
                    return <td>{R.propOr('', 'displayName', col)}</td>; 
            }
        }
        return null;
    }

    handleIconClick = () => {
        console.log('hello');
    }

    handleRowClick = (row) => {
        const { processRowClick, headers } = this.props;
        return (event) => {
            const idRow = R.find(R.propEq('identity', true))(headers);
            processRowClick(R.prop(idRow?.selector, row));
        };
    }

    renderCell = (col: columnSchema, row: any) => {
        if(R.propOr(true, 'display', col)){
            switch(R.propOr('text', 'type', col)){
                case 'button': {
                    const Icon = R.propOr(<></>, 'cellIcon', col);
                    return <td><Icon onClick={this.handleIconClick}/></td>;
                }; 
                case 'text':
                default: {
                  return (
                    <td 
                        className="clickable"
                        onClick={this.handleRowClick(row)} 
                        key={R.propOr('', R.propOr('', 'selector', col), row)}>
                    {R.propOr('', R.propOr('', 'selector', col), row)}
                    </td>);
                }
            }
        }
        return null;
    }

    render() {
    const { headers, tableData, dataStatus } = this.props;
    if(R.equals(dataStatus, 'loading')){
        return <p>loading</p>;
    }
      return (
        <div id="tableContainer">
            <table>
                <thead>
                    <tr>
                        {headers.map(col=> this.renderHeader(col))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(row=> {
                        return (
                        <tr key={Object.values(row).join('')}>
                            {headers.map(col =>this.renderCell(col, row))}
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      );
    }
}

export default Table;
