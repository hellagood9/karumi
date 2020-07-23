exports.handler = async ({ body }) => {
  let errorStatusCode = 500;

  const user = {
    name: "John Doe",
    username: "doe@test.com",
    password: "123456",
    jwtoken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.4lnM9fXjW0jtT3lkh8d8D9jMPG52KOVlFXj9C0qUzTQ",
  };

  try {
    // 1.Get the username and password from the request body
    const { username, password } = JSON.parse(body);

    // 2.Check to see if the user exists, if not return error (401 Unauthorized)
    const isExistingUser =
      username === user.username && password === user.password;

    if (!isExistingUser) {
      errorStatusCode = 401;
      throw new Error(`Invalid password or username`);
    }

    // 3.Return the user's username (or ID) and the JWT
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
      statusCode: errorStatusCode,
      body: JSON.stringify({ success: false, msg: err.message }),
    };
  }
};
