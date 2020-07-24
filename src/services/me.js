exports.handler = async ({ body }) => {
  const user = {
    name: "John Doe",
    username: "doe@test.com",
    password: "123456",
    jwtoken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.4lnM9fXjW0jtT3lkh8d8D9jMPG52KOVlFXj9C0qUzTQ",
  };

  // 1.Check to see if the token exists, if not return error (401 Unauthorized)
  const userToken = JSON.parse(body);

  if (!userToken) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        msg: "There is no jwtoken, so the request is unauthorized",
      }),
    };
  }

  try {
    // Verify and throws an error if it can't verify the jwt.
    const isExistingUser = userToken === user.jwtoken;

    if (!isExistingUser) {
      throw new Error(`Invalid token`);
    }

    // If the token is successfully verified, it returns the payload.
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        jwtoken: user.jwtoken,
        user: {
          name: user.name,
          username: user.username,
        },
      }),
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
