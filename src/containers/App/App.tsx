import * as React from "react";
import { connect, ConnectedProps } from 'react-redux';
import Table from "../../components/Table";
import { userTable, hobbyTable } from "../../constants";
import { selectors as userSelectors, actions as userActions } from "../../state/ducks/user";
import { selectors as hobbySelectors, actions as hobbyActions } from "../../state/ducks/hobby";

import './App.scss';

interface DispatchProps  {
  processAction: Function;
  fetchAllUsers: Function;
  fetchHobbyByUserId: Function;
}

interface StateProps  {
  userData: any;
  hobbyData: any;
}
interface OwnProps  {
}

type State = {
   selectedRowId: any;
   leftTableStatus: string | null;
   rightTableStatus: string | null;
};


type Props = StateProps & DispatchProps & OwnProps

class App extends React.Component<Props, State> {
    public static defaultProps = {
      userData: [],
      hobbyData: []
    };

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
        const { selectedRowId } = this.state;
        const payload = {
          selectedRowId,
          textInputState,
        }
        processAction(action, payload);
    }

    processRowClick = (id: any) => {
      const { fetchHobbyByUserId } = this.props;
      this.setState((state)=> {
        return {
          ...state,
          selectedRowId: id,
        }
      })
      fetchHobbyByUserId(id);
    }

    render() {
      const { rightTableStatus, selectedRowId } = this.state;
      const { userData, hobbyData } = this.props;
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
              selectedRowId={selectedRowId}
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

const mapStateToProps = (state) => ({
  userData: userSelectors.getUsers(state),
  hobbyData: hobbySelectors.getHobbies(state),
});

const mapDispatchToProps = dispatch => ({
  processAction: (type: string, payload: any) => dispatch(userActions.default.processAction(type, payload)),
  fetchAllUsers: () => dispatch(userActions.default.fetchAllUsersAction()),
  fetchHobbyByUserId: (payload: any) => dispatch(hobbyActions.default.fetchHobbyByUserId(payload)),
});


export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(App);

