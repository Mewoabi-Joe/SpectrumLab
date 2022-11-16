import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTest from "./pages/AddTest";
import EditTest from "./pages/EditTest";
import Users from "./pages/Users";
import MyLabTest from "./pages/MyLabTest";
import Home from "./pages/Home";
import LabTestDetails from "./pages/LabTestDetails";
import LabTests from "./pages/LabTests";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setUser } from "./redux/actions/authActions";
import { bindActionCreators } from "redux";
import axiosInstance from "./utils/axios";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Inbox from "./pages/Inbox";
import MessageDetails from "./pages/MessageDetails";
import CreatePost from "./pages/createPost";
import EducationAndNews from "./pages/EducationAndNews";
import PostDetails from "./pages/PostDetails";

function App(props) {
	const [user, setUser] = useState({});

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await axiosInstance.get("/auth/get-user");
				props.setUser(res.data);
				setUser(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getUser();
	}, []);

	return (
		<div className="App ">
			<BrowserRouter>
				<Routes>
					<Route path="/spectrumlab" element={<Home currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/signup" element={<Signup currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/login" element={<Login currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/lab_tests" element={<LabTests currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/lab_test_details" element={<LabTestDetails currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/add_test" element={<AddTest currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/edit_test/:testId" element={<EditTest currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/my_lab_tests/:userId" element={<MyLabTest currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/profile/:userId" element={<Profile currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/profileEdit/:userId" element={<ProfileEdit currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/users" element={<Users currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/inbox" element={<Inbox currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/message_details" element={<MessageDetails currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/create_post" element={<CreatePost currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/education_news" element={<EducationAndNews currentUser={user} />} />
				</Routes>
				<Routes>
					<Route path="/post_details" element={<PostDetails currentUser={user} />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

const mapStateToProps = ({ auth }) => {
	return {
		currentUser: auth.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ setUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
