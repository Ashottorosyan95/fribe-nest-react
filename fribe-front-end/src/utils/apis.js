import server from "./server";
import mapServer from "./mapServer";
export async function createLocation(payload, enqueueSnackbar) {
  try {
    const result = await mapServer.post("/admin/place", payload);
    enqueueSnackbar(result.data.message, {
      variant: "success",
      autoHideDuration: 3000,
    });

    return result;
  } catch (error) {
    console.log("error: ", error);
    error &&
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    return false;
  }
}

export async function uploadExcel(file, enqueueSnackbar) {
  try {
    const result = await mapServer.post("/admin/place/uploadexcel-data", file);
    console.log("result: ", result);

    return true;
  } catch (error) {
    console.log("error: ", error);
    error &&
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        autoHideDuration: 3000,
      });

    return false;
  }
}

export async function login(data, enqueueSnackbar) {
  try {
    const result = await server.post(`/public/user/login`, {
      email: data.email,
      password: data.password,
      role: "admin"
    })
    return result;
  } catch (error) {
    error &&
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    return false;
  }
}

export async function fetchUserData(enqueueSnackbar) {
  try {
    const result = await server.get(`/admin/user/get-by-access-token/${localStorage.access_token}`)
    return result.data.data;
  } catch (error) {
    error &&
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    return false;
  }
}

export async function fetchUsersListsData(filters, enqueueSnackbar) {
  try {
    const result = await server.get(`/admin/user/list?search=${filters.search || ''}&perPage=${filters.perPage || 20}&page=${filters.page || 1}&orderBy=${filters.orderBy || 'createdAt'}&orderDirection=${filters.orderDirection || 'asc'}&isActive=${filters.isActive || 'true,false'}&blocked=${filters.blocked || 'true,false'}`)
    return result.data.data;
  } catch (error) {
    error &&
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    return false;
  }
}

export async function activateUser(userId, enqueueSnackbar) {
  try {
    const result = await server.patch(`/admin/user/update/${userId}/active`)
    return result.data.data;
  } catch (error) {
    error &&
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    return false;
  }
}

export async function inactivateUser(userId, enqueueSnackbar) {
  try {
    const result = await server.patch(`/admin/user/update/${userId}/inactive`)
    return result.data.data;
  } catch (error) {
    error &&
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    return false;
  }
}

export async function searchPlacesByText(filters, enqueueSnackbar) {
  try {
    const result = await mapServer.get(`/admin/place/textsearch?search=${filters.search}`)
    return result.data;
  } catch (error) {
    error &&
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    return false;
  }
}

export async function searchPlacesByCoordinates(filters, enqueueSnackbar) {
  try {
    const result = await mapServer.get(`/admin/place?lat=${filters.latitude}&long=${filters.longitude}`)
    return result.data;
  } catch (error) {
    error &&
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    return false;
  }
}

export async function getPlacesByCoordinates(filters, enqueueSnackbar) {
  try {
    const result = await mapServer.get(`/admin/place/nearbysearch?name=${filters.name || ''}&radius=${filters.radius}&location=${filters.location}`)
    return result.data;
  } catch (error) {
    error &&
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    return false;
  }
}