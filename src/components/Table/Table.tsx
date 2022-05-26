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
    className: string;
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

    handleIconClick = (action, idRow, row) => {
        const { processAction, headers } = this.props;
        return () => {
            processAction(action, R.prop(idRow?.selector as any, row));
        };
    }
    

    handleRowClick = (idRow, row) => {
        const { processRowClick, headers } = this.props;
        return () => {
            processRowClick(R.prop(idRow?.selector as any, row));
        };
    }

    renderCell = (col: columnSchema, row: any) => {
        const { selectedRowId, headers } = this.props;
        const idRow: any = R.find(R.propEq('identity', true))(headers as any);
        const selected = selectedRowId && R.equals(R.prop(idRow?.selector, row), selectedRowId) ? "selected": "not-selected";
        const clickable = col?.clickable ? "clickable": "non-clickable";
        const className = `${selected} ${clickable}`
        if(R.propOr(true, 'display', col)){
            switch(R.propOr('text', 'type', col)){
                case 'button': {
                    const Icon: IconType = R.propOr(<></>, 'cellIcon', col);
                    return <td className={selected}><Icon className="clickable" onClick={this.handleIconClick(col.cellAction, idRow, row)}/></td>;
                }; 
                case 'text':
                default: {
                  return (
                    <td 
                        className={className}
                        onClick={col?.clickable && this.handleRowClick(idRow, row)} 
                        key={R.propOr('', R.propOr('', 'selector', col), row)  as unknown as string}>
                    {R.propOr('', R.propOr('', 'selector', col), row) as unknown as string}
                    </td>);
                }
            }
        }
        return null;
    }

    renderEmptyTable = () => {
        const { tableData, headers } = this.props;
        if(R.isEmpty(tableData)) {
            return (<tr className="no-data">
                <td colSpan={headers.length||0}>
                No Data Found
                </td>
            </tr>);
        } 
        return null;
    }

    render() {
    const { headers, tableData, className } = this.props;
      return (
        <div className={className}>
            <table className="table-div">
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
                    {this.renderEmptyTable()}
                </tbody>
            </table>
        </div>
      );
    }
}

export default Table;
