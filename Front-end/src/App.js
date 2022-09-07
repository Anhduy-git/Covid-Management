import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import RegisterPassword from "./pages/register/RegisterPassword";
import RegisterAdmin from "./pages/register/RegisterAdmin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Redirect} from "react-router";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context/Context";
import axios from "axios";
import ListManagers from "./pages/admin/list-managers/ListManagers";
import CreateManagers from "./pages/admin/create-managers/CreateManagers";
import ListTreatmentPlaces from "./pages/admin/list-treatment-places/ListTreatmentPlaces";
import CreateTreatmentPlaces from "./pages/admin/create-treatment-places/CreateTreatmentPlaces";

// import ListManageProcesses from "./pages/admin/list-manage-processes/ListManageProcesses";
import ListUsers from "./pages/manager/list-users/ListUsers";
import CreateUsers from "./pages/manager/create-users/CreateUsers";
import ListRelatedUsers from "./pages/manager/list-related-users/ListRelatedUsers";
import CreateRelatedUsers from "./pages/manager/create-related-users/CreateRelatedUsers";
import UserInfo from "./pages/manager/users-info/UserInfo";
// import ListManagedProcesses from "./pages/manager/list-managed-processes/ListManagedProcesses";
// import ListNecessaries from "./pages/manager/list-necessaries/ListNecessaries";
// import CreateNecessaries from "./pages/manager/create-necessaries/CreateNecessaries";
// import NecessaryInfo from "./pages/manager/necessary-info/NecessaryInfo";
// import ListNecessariesPackages from "./pages/manager/list-necessaries-packages/ListNecessariesPackages";
// import CreateNecessariesPackages from "./pages/manager/create-necessaries-packages/CreateNecessariesPackages";
// import ListChooseNecessaries from "./pages/manager/list-choose-necessaries/ListChooseNecessaries";
// import NecessaryPackageInfo from "./pages/manager/necessary-package-info/NecessaryPackageInfo";
// import MyInfo from "./pages/user/user-info/MyInfo";
// import MyListManagedProcesses from "./pages/user/list-managed-processes/MyListManagedProcesses";
// import ChangePassword from "./pages/user/change-password/ChangePassword";
// import BuyNecessariesPackages from "./pages/user/buy-necessaries-packages/BuyNecessariesPackages";
// import NecessariesPackageInfoView from "./pages/user/necessaries-package-info-view/NecessariesPackageInfoView";
// import MyListTransaction from "./pages/user/list-transactions/MyListTransaction";
// import Payment from "./pages/user/payment/Payment";
// import UserListTransactions from "./pages/manager/user-list-transactions/UserListTransactions";

// window.localStorage.clear();
function App() {
	const { user, priority } = useContext(Context);
	const [hasAdmin, setHasAdmin] = useState(false);


	useEffect(() => {
			const checkHasAdmin = async () => {
			const res = await axios.get("/managers/checkHasAdmin");
			const data = res.data;	
			setHasAdmin(data.hasAdmin);
		};
		checkHasAdmin();
	}, []); //if search update, then run again
	
	return (
	<Router>

		<Switch>			
			<Route exact path="/">
				{user ? <Home />:
					<>
						{hasAdmin ? <Redirect to="/login"/>: <Redirect to="/registerAdmin"/>}
					</>
				}
			</Route>			
			<Route path="/registerAdmin">{hasAdmin ? <Redirect to="/login"/>: <RegisterAdmin />}</Route>
			<Route path="/registerPassword">{user ? <Home /> : <RegisterPassword />}</Route>
			<Route path="/login">{user ? <Redirect to="/"/> : <Login />}</Route>	
			{/* Admin Features */}
			<Route path="/createManagers">{priority == 0 &&  <CreateManagers />}</Route>
			<Route path="/createTreatmentPlaces">{priority == 0 &&  <CreateTreatmentPlaces />}</Route>
			<Route path="/listTreatmentPlaces">{priority == 0 &&  <ListTreatmentPlaces />}</Route>	
			<Route path="/listManagers">{priority == 0 &&  <ListManagers />}</Route>	
			{/* <Route path="/listManagers">{priority == 0 &&  <ListManagers />}</Route>	
			
			
			
			<Route path="/listManageProcesses">{priority == 0 &&  <ListManageProcesses />}</Route> */}
			{/* Manager Features */}
			<Route path="/createUsers">{priority == 1 &&  <CreateUsers />}</Route>	
			<Route path="/userInfo">{priority == 1 &&  <UserInfo />}</Route>	
			<Route path="/listUsers">{priority == 1 &&  <ListUsers />}</Route>
			<Route path="/listRelatedUsers">{priority == 1 &&  <ListRelatedUsers />}</Route>	
			<Route path="/createRelatedUsers">{priority == 1 &&  <CreateRelatedUsers />}</Route>	
			{/* 
			
			
			
			<Route path="/listManagedProcesses">{priority == 1 &&  <ListManagedProcesses />}</Route>
			<Route path="/listNecessaries">{priority == 1 &&  <ListNecessaries />}</Route>
			<Route path="/createNecessaries">{priority == 1 &&  <CreateNecessaries />}</Route>
			<Route path="/necessaryInfo">{priority == 1 &&  <NecessaryInfo />}</Route>	
			<Route path="/listNecessariesPackages">{priority == 1 &&  <ListNecessariesPackages />}</Route>
			<Route path="/createNecessariesPackages">{priority == 1 &&  <CreateNecessariesPackages />}</Route>
			<Route path="/chooseNecessaries">{priority == 1 &&  <ListChooseNecessaries />}</Route>
			<Route path="/necessariesPackageInfo">{priority == 1 &&  <NecessaryPackageInfo />}</Route>
			<Route path="/listTransactions">{priority == 1 &&  <UserListTransactions />}</Route> */}
			{/* User Features */}
			{/* <Route exact path="/me">{priority == 2 &&  <MyInfo />}</Route>
			<Route path="/me/listManagedProcesses">{priority == 2 &&  <MyListManagedProcesses />}</Route>
			<Route path="/me/changePassword">{priority == 2 &&  <ChangePassword />}</Route>
			<Route path="/buyNecessariesPackages">{priority == 2 &&  <BuyNecessariesPackages />}</Route>
			<Route path="/necessariesPackageInfoView">{priority == 2 &&  <NecessariesPackageInfoView />}</Route>
			<Route path="/me/listTransactions">{priority == 2 &&  <MyListTransaction />}</Route>
			<Route path="/me/payment">{priority == 2 &&  <Payment />}</Route> */}
		</Switch>
	</Router>
	);
}

export default App;

