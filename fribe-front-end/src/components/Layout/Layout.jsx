import React, { useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../utils/apis";
import { useSnackbar } from "notistack";
import UsersList from "../UsersList/UsersList";
import SearchPlace from "../SearchPlace/SearchPlace";
import AddPlace from "../AddPlace/AddPlace";

const Layout = ({ selectedPage, setSelectedPage, userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!localStorage.access_token) {
      navigate("/")
    } else {
      const fetchData = async () => {
        const user = await fetchUserData(enqueueSnackbar)
        setUserInfo(user)
      }
      fetchData()
    }
    if (localStorage.selectedPage) {
      setSelectedPage(localStorage.selectedPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app-layout">
      <Header userInfo={userInfo} />
      <Sidebar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <div className="app-container">
        {selectedPage === "dashboard" ? (
          <div>Dashboard</div>
        ) : selectedPage === "usersList" ? (
          <UsersList />
        ) : selectedPage === "analytics" ? (
          <div>Analytics</div>
        ) : selectedPage === "subAdmins" ? (
          <div>Sub admins</div>
        ) : selectedPage === "plansSetup" ? (
          <div>Plans setup</div>
        ) : selectedPage === "chatSupport" ? (
          <div>Chat support</div>
        ) : selectedPage === "locations" ? (
          <AddPlace />
        ) : selectedPage === "billsPay" ? (
          <div>Bills & Pay</div>
        ) : selectedPage === "fribeMap" ? (
          <SearchPlace />
        ) : null}
      </div>
    </div>
  );
};

export default Layout;
