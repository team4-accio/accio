import React from "react";

function Login() {
  return (
    <div class="container">
      <div class="row">
        <div class="col s10">
          <form method="post" action="" class="forms">
            <label>
              Email <span class="req">*</span>
              <input type="email" name="user-email" class="width-50" />
            </label>

            <label>
              Password
              <input type="password" name="user-password" class="width-50" />
            </label>
            <p>
              <button class="btn btn-blue">Log in</button>
              <button class="btn">Cancel</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
