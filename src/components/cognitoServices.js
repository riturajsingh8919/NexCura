// services/cognitoService.js
"use client";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
  ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export const signUp = (email, password) => {
  console.log("🔵 SignUp attempt for email:", email);
  return new Promise((resolve, reject) => {
    const attributes = [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "preferred_username",
        Value: email,
      },
    ];

    userPool.signUp(email, password, attributes, null, (err, data) => {
      if (err) {
        console.error("❌ SignUp Error:", {
          code: err.code,
          message: err.message,
          name: err.name,
          fullError: err,
        });
        reject(err);
      } else {
        console.log("✅ SignUp Success:", {
          userConfirmed: data.userConfirmed,
          userSub: data.userSub,
          username: data.user?.username,
          codeDeliveryDetails: data.codeDeliveryDetails,
          fullResponse: data,
        });
        resolve(data);
      }
    });
  });
};

export const signIn = (email, password) => {
  console.log("🔵 SignIn attempt for email:", email);
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("✅ SignIn Success:", {
          username: result.username,
          accessToken: result.accessToken?.jwtToken?.substring(0, 50) + "...",
          idToken: result.idToken?.jwtToken?.substring(0, 50) + "...",
          refreshToken: result.refreshToken?.token?.substring(0, 50) + "...",
          tokenPayload: result.idToken?.payload,
          fullResult: result,
        });
        resolve(result);
      },
      onFailure: (err) => {
        console.error("❌ SignIn Error:", {
          code: err.code,
          message: err.message,
          name: err.name,
          fullError: err,
        });
        reject(err);
      },
    });
  });
};

export const confirmSignUp = (email, code) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const resendConfirmationCode = (email) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const sendForgotPasswordCode = (email) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        console.log("Password reset OTP sent:", data);
        resolve(data);
      },
      onFailure: (err) => {
        console.error("Error sending password reset OTP:", err.message);
        reject(err);
      },
    });
  });
};

export const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        console.log("Forgot password success:", data);
        resolve(data);
      },
      onFailure: (err) => {
        console.log("Forgot password error", err);
        reject(err);
      },
    });
  });
};

export const confirmPassword = (email, code, newPassword) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => {
        resolve("Password changed successfully");
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

// Change password after email confirmation (for new user signup)
export const setNewPassword = (email, tempPassword, newPassword) => {
  console.log("🔵 Setting new password for:", email);
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: tempPassword,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log(
          "✅ Authenticated with temp password, now changing password..."
        );

        // Now change the password
        cognitoUser.changePassword(tempPassword, newPassword, (err, result) => {
          if (err) {
            console.error("❌ Error changing password:", err);
            reject(err);
          } else {
            console.log("✅ Password changed successfully:", result);
            resolve(result);
          }
        });
      },
      onFailure: (err) => {
        console.error("❌ Error authenticating with temp password:", err);
        reject(err);
      },
    });
  });
};

export const signOut = (email) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    if (cognitoUser) {
      cognitoUser.signOut();
      resolve("User signed out successfully");
    } else {
      reject(new Error("No user found to sign out"));
    }
  });
};
