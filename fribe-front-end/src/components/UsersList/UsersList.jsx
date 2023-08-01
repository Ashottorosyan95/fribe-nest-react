import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { activateUser, fetchUsersListsData, inactivateUser } from '../../utils/apis';
import moment from 'moment';
import formatNumber from '../../helpers/formatNumber';

const UsersList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [searchValue, setSearchValue] = useState("");
  const [usersList, setUsersList] = useState([]);

  const handleStatusChange = async (e) => {
    if (e.target.value === 'active') {
      const res = await activateUser(e.target.id, enqueueSnackbar);
      const clonseUsersList = [...usersList];
      const userIndex = clonseUsersList.findIndex(user => user._id === res._id);
      clonseUsersList[userIndex].isActive = res.isActive;
      setUsersList(clonseUsersList);
    } else {
      const res = await inactivateUser(e.target.id, enqueueSnackbar);
      const clonseUsersList = [...usersList];
      const userIndex = clonseUsersList.findIndex(user => user._id === res._id);
      clonseUsersList[userIndex].isActive = res.isActive;
      setUsersList(clonseUsersList);
    }
  }

  const fetchData = async () => {
    const filters = {
      search: searchValue,
      perPage: 20,
      page: 1,
      orderBy: 'createdAt',
      orderDirection: 'asc',
      isActive: 'true,false',
      blocked: 'true,false'
    }
    const users = await fetchUsersListsData(filters, enqueueSnackbar);
    setUsersList(users);
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  return (
    <div className="users-list-screen">
      <div className="d-flex align-items-center flex-wrap">
        <div className="form-group has-search">
          <img src="images/search.png" alt="" className="form-search-feedback" />
          <input type="text" className="form-control primary-form-control" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
        {/* <div className="dropdown ms-4">
          <button
            className="btn btn-outline-secondary dropdown-toggle user-list-dropdown-toogle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            All Users
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/">Action</a></li>
            <li><a className="dropdown-item" href="/">Another action</a></li>
            <li><a className="dropdown-item" href="/">Something else here</a></li>
          </ul>
        </div> */}
      </div>

      <div className="mt-5">
        {usersList.length ?
          <table className="table">
            <thead>
              <tr>
                <th className="user-header-item">Username</th>
                <th className="user-header-item">Company</th>
                <th className="user-header-item header-item-center">Account Status</th>
                <th className="user-header-item header-item-center">Usage Req</th>
                <th className="user-header-item header-item-center">Plan Expiry</th>
                <th className="user-header-item header-item-center">Created on</th>
                <th className="user-header-item header-item-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersList && usersList.map(user => {
                return (
                  <tr className="data-row-verticle-middle" key={user._id}>
                    <td className="user-data-item data-item-captilize">{user.firstName + " " + user.lastName}</td>
                    <td className="user-data-item data-item-captilize data-item-captilize">{user.companyName}</td>
                    <td className="user-data-item data-item-center">
                      {user.isActive ?
                        <span className="acc-status-badge status-badge-active"> ACTIVATED</span> :
                        <span className="acc-status-badge status-badge-suspended">SUSPENDED</span>
                      }
                    </td>
                    <td className="user-data-item data-item-center data-item-uppercase">{formatNumber(user.usageReq)}</td>
                    <td className="user-data-item data-item-center data-item-uppercase">Dec 29, 2022</td>
                    <td className="user-data-item data-item-center">{moment(user.createdAt).format('MMM D, YYYY [at] HH:MM A')}</td>
                    <td className="bg-transparent">
                      <select id={user._id} className="form-select primary-form-control" onChange={handleStatusChange} defaultValue={user.isActive ? "active" : "suspended"}>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </td>
                  </tr>

                )
              })}
            </tbody>
          </table> : <div>No matching result</div>
        }
      </div>
    </div>
  )
}

export default UsersList