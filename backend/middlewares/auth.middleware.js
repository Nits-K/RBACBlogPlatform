import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessAndRefreshTokens } from "../controllers/user.controller.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Please login first to proceed.");
    }
    
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

      if (!refreshToken) {
        throw new ApiError(
          401,
          "Access token expired and no refresh token provided."
        );
      }

      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      const user = await User.findById(decodedRefreshToken._id);
      if (!user) {
        throw new ApiError(401, "User not found.");
      }

      if (refreshToken !== user.refreshToken) {
        throw new ApiError(401, "Invalid or expired refresh token.");
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await generateAccessAndRefreshTokens(user._id);

      const options = {
        httpOnly: true,
        secure: true,
      };

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json({
          statusCode: 200,
          data: { accessToken, refreshToken: newRefreshToken },
          message: "Access Token refreshed",
        });
    }

    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
