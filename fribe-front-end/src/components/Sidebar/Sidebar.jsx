import React, { useRef } from "react";

const Sidebar = ({ selectedPage, setSelectedPage }) => {
  const ref = useRef(null);
  return (
    <>
      <div className="sidebar-nav-wrapper sidebar-nav-shadow-effect fixed-sidebar-nav">
        <button
          className={`btn sidebar-nav-btn ${selectedPage === "dashboard" ? "sidebar-nav-btn-active" : ""
            }`}
          onClick={() => { setSelectedPage("dashboard"); localStorage.selectedPage = "dashboard" }}
        >
          Dashboard
        </button>
        <button
          className={`btn sidebar-nav-btn ${selectedPage === "usersList" ? "sidebar-nav-btn-active" : ""
            }`}
          onClick={() => { setSelectedPage("usersList"); localStorage.selectedPage = "usersList" }}
        >
          Users List
        </button>
        <button
          className={`btn sidebar-nav-btn ${selectedPage === "analytics" ? "sidebar-nav-btn-active" : ""
            }`}
          onClick={() => { setSelectedPage("analytics"); localStorage.selectedPage = "analytics" }}
        >
          Analytics
        </button>
        <button
          className={`btn sidebar-nav-btn ${selectedPage === "subAdmins" ? "sidebar-nav-btn-active" : ""
            }`}
          onClick={() => { setSelectedPage("subAdmins"); localStorage.selectedPage = "subAdmins" }}
        >
          Sub admins
        </button>
        <button
          className={`btn sidebar-nav-btn ${selectedPage === "plansSetup" ? "sidebar-nav-btn-active" : ""
            }`}
          onClick={() => { setSelectedPage("plansSetup"); localStorage.selectedPage = "plansSetup" }}
        >
          Plans setup
        </button>
        <button
          className={`btn sidebar-nav-btn ${selectedPage === "chatSupport" ? "sidebar-nav-btn-active" : ""
            }`}
          onClick={() => { setSelectedPage("chatSupport"); localStorage.selectedPage = "chatSupport" }}
        >
          Chat support
        </button>
        <button
          className={`btn sidebar-nav-btn ${selectedPage === "locations" ? "sidebar-nav-btn-active" : ""
            }`}
          onClick={() => { setSelectedPage("locations"); localStorage.selectedPage = "locations" }}
        >
          Locations
        </button>
        <button
          className={`btn sidebar-nav-btn ${selectedPage === "billsPay" ? "sidebar-nav-btn-active" : ""
            }`}
          onClick={() => { setSelectedPage("billsPay"); localStorage.selectedPage = "billsPay" }}
        >
          Bills & Pay
        </button>
        <button
          className={`btn sidebar-nav-btn ${selectedPage === "fribeMap" ? "sidebar-nav-btn-active" : ""
            }`}
          onClick={() => { setSelectedPage("fribeMap"); localStorage.selectedPage = "fribeMap" }}
        >
          Fribe Map
        </button>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="sideBarOffcanvas"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <button
            ref={ref}
            type="button"
            className="btn-close ms-auto"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <button
            className={`btn sidebar-nav-btn ${selectedPage === "dashboard" ? "sidebar-nav-btn-active" : ""
              }`}
            onClick={() => {
              setSelectedPage("dashboard");
              localStorage.selectedPage = "dashboard";
              ref.current.click();
            }}
          >
            Dashboard
          </button>
          <button
            className={`btn sidebar-nav-btn ${selectedPage === "usersList" ? "sidebar-nav-btn-active" : ""
              }`}
            onClick={() => {
              setSelectedPage("usersList");
              localStorage.selectedPage = "usersList";
              ref.current.click();
            }}
          >
            Users List
          </button>
          <button
            className={`btn sidebar-nav-btn ${selectedPage === "analytics" ? "sidebar-nav-btn-active" : ""
              }`}
            onClick={() => {
              setSelectedPage("analytics");
              localStorage.selectedPage = "analytics";
              ref.current.click();
            }}
          >
            Analytics
          </button>
          <button
            className={`btn sidebar-nav-btn ${selectedPage === "subAdmins" ? "sidebar-nav-btn-active" : ""
              }`}
            onClick={() => {
              setSelectedPage("subAdmins");
              localStorage.selectedPage = "subAdmins";
              ref.current.click();
            }}
          >
            Sub admins
          </button>
          <button
            className={`btn sidebar-nav-btn ${selectedPage === "plansSetup" ? "sidebar-nav-btn-active" : ""
              }`}
            onClick={() => {
              setSelectedPage("plansSetup");
              localStorage.selectedPage = "plansSetup";
              ref.current.click();
            }}
          >
            Plans setup
          </button>
          <button
            className={`btn sidebar-nav-btn ${selectedPage === "chatSupport" ? "sidebar-nav-btn-active" : ""
              }`}
            onClick={() => {
              setSelectedPage("chatSupport");
              localStorage.selectedPage = "chatSupport";
              ref.current.click();
            }}
          >
            Chat support
          </button>
          <button
            className={`btn sidebar-nav-btn ${selectedPage === "locations" ? "sidebar-nav-btn-active" : ""
              }`}
            onClick={() => {
              setSelectedPage("locations");
              localStorage.selectedPage = "locations";
              ref.current.click();
            }}
          >
            Locations
          </button>
          <button
            className={`btn sidebar-nav-btn ${selectedPage === "billsPay" ? "sidebar-nav-btn-active" : ""
              }`}
            onClick={() => {
              setSelectedPage("billsPay");
              localStorage.selectedPage = "billsPay";
              ref.current.click();
            }}
          >
            Bills & Pay
          </button>
          <button
            className={`btn sidebar-nav-btn ${selectedPage === "fribeMap" ? "sidebar-nav-btn-active" : ""
              }`}
            onClick={() => {
              setSelectedPage("fribeMap");
              localStorage.selectedPage = "fribeMap";
              ref.current.click();
            }}
          >
            Fribe Map
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
