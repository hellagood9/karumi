export const sendRequest = async (endpoint, body) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    };

    if (body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(
      `/.netlify/functions/${endpoint}`,
      requestOptions
    );

    if (response.ok) {
      const responseBody = await response.json();
      return responseBody;
    }

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
};
