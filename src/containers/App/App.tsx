import * as React from "react";
import { connect } from 'react-redux';
import Table from "../../components/Table";
import { userTable, userData, hobbyData, hobbyTable } from "../../constants";
import actions from "../../state/ducks/user/actions";
import './App.scss';

type Props = {
  processAction: Function;
  fetchAllUsers: Function;
}

type State = {
   selectedRowId: any;
   leftTableStatus: string | null;
   rightTableStatus: string | null;
};

class App extends React.Component<Props, State> {
    state: State = {
      selectedRowId: null,
      leftTableStatus: null,
      rightTableStatus: null,
    };

    componentDidMount() {
      const { fetchAllUsers } = this.props;
      fetchAllUsers();
    }

    processClick = (action: string, textInputState: any) => {
        const { processAction } = this.props;
        processAction(action, textInputState);
    }

    processRowClick = (id: any) => {
      console.log(id);
      this.setState((state)=> {
        return {
          ...state,
          selectedRowId: id,
          rightTableStatus: 'loading'
        }
      })
    }

    render() {
      const { rightTableStatus } = this.state;
      return (
        <div className="">
          <div className="user-hobby">
            <Table 
              headers={userTable} 
              tableData={userData} 
              processAction={this.processClick}
              processRowClick={this.processRowClick}
            />
            <Table 
              headers={hobbyTable} 
              tableData={hobbyData}
              dataStatus={rightTableStatus} 
              processAction={this.processClick}
            />
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  processAction: (type: string, payload: any) => dispatch(actions.processAction(type, payload)),
  fetchAllUsers: () => dispatch(actions.fetchAllUsersAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
