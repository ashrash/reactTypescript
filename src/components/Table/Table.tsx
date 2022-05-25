import * as React from "react";
import * as R from 'ramda';
import { columnSchema } from '../../models/table';
import './Table.scss';
import { IconType } from "react-icons";

type Props = {
    headers: columnSchema[];
    tableData: any;
    processAction?: Function;
    processRowClick?: Function;
    dataStatus?: string;
    selectedRowId?: string;
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
            const data = event.target.value;
            this.setState((state) => {
                const newState = R.assocPath(['textInputState', R.prop('selector', col)],
                data, state);
                return newState;
            });
        };
    }

    handleButtonClick = (action) => {
        const { textInputState } = this.state;
        const  { processAction } = this.props;
        return () => {
            processAction(action, textInputState)
            this.setState((state: State) => {
                    state.textInputState ={};
                    return state;
            });//TODO
        };
    }

    renderHeader = (col: columnSchema) => {
        const { textInputState } = this.state;
        if(R.propOr(true, 'display', col)){
            switch(R.propOr('text', 'type', col)){
                case 'input': {
                    return (<td>
                            <input 
                                placeholder={R.propOr('', 'displayName', col)} 
                                value={R.prop(col?.selector, textInputState) || ""} 
                                onChange={this.handleTextChange(col)} 
                                type="text"
                                id={R.propOr('', 'displayName', col)}
                                name={R.propOr('', 'displayName', col)}
                             />
                        </td>);
                };
                case 'button': return <td><button onClick={this.handleButtonClick(col.headerAction)}>{R.propOr('', 'displayName', col)}</button></td>;
                case 'text': 
                default:
                    return <td>{R.propOr('', 'displayName', col)}</td>; 
            }
        }
        return null;
    }

    handleIconClick = (action, row) => {
        const { processAction, headers } = this.props;
        return () => {
            const idRow: any = R.find(R.propEq('identity', true))(headers as any);
            processAction(action, R.prop(idRow?.selector as any, row));
        };
    }
    

    handleRowClick = (row) => {
        const { processRowClick, headers } = this.props;
        return () => {
            const idRow: any = R.find(R.propEq('identity', true))(headers as any);
            processRowClick(R.prop(idRow?.selector as any, row));
        };
    }

    renderCell = (col: columnSchema, row: any) => {
        if(R.propOr(true, 'display', col)){
            switch(R.propOr('text', 'type', col)){
                case 'button': {
                    const Icon: IconType = R.propOr(<></>, 'cellIcon', col);
                    return <td><Icon className="clickable" onClick={this.handleIconClick(col.cellAction, row)}/></td>;
                }; 
                case 'text':
                default: {
                  return (
                    <td 
                        className={col?.clickable ? "clickable": "non-clickable"}
                        onClick={col?.clickable && this.handleRowClick(row)} 
                        key={R.propOr('', R.propOr('', 'selector', col), row)  as unknown as string}>
                    {R.propOr('', R.propOr('', 'selector', col), row) as unknown as string}
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
