<!-- public/index.php -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      text-align: center;
      margin-top: 50px;
    }
    .container {
      width: 300px;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin: 0 auto;
    }
    input[type="text"], input[type="password"] {
      width: calc(100% - 20px);
      padding: 10px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    input[type="submit"] {
      background-color: #4CAF50;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      width: calc(100% - 20px);
    }
    input[type="submit"]:hover {
      background-color: #45a049;
    }
    p.error {
      color: red;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Login</h2>
    <form action="/login" method="POST">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required>
    
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required>
    
      <input type="submit" value="Login">
    </form>
    <?php
      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // PHP code to handle form submission
        $username = $_POST['username'];
        $password = $_POST['password'];

        // You can add server-side validation and authentication logic here
        // For demonstration purposes, this example does not include validation
        // or actual authentication with a database.
        if (isset($users[$username]) && $users[$username] === $password) {
          echo "Welcome, $username!";
        } else {
          echo "Invalid username or password. Please try again.";
        }
      }
    ?>
  </div>
</body>
</html>
