import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

import { User } from "@/models/user";
import { toJson } from "@/resources/responseResource";
import cloudUploader from "@/utils/cloudinary";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserProfile;
    }
  }
}

/**
 * Get User Profile
 * 1. return the user profile
 */
export const getProfile: RequestHandler = async (req, res) => {
  try {
    res.json({
      profile: req.user,
    });
  } catch {
    return toJson(null, 500, "Server Error", res);
  }
};

export const updateProfile: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;
    if (typeof name !== "string" || name.trim().length < 3) {
      return toJson(null, 422, "Invalid Name", res);
    }

    await User.findByIdAndUpdate(req.user.id, {
      name,
    });

    toJson(
      {
        profile: { ...req.user, name },
      },
      200,
      null,
      res
    );
  } catch {
    return toJson(null, 500, "Server Error", res);
  }
};

export const updateAvatar: RequestHandler = async (req, res) => {
  try {
    const { avatar } = req.files;
    // blocked multiple files
    if (Array.isArray(avatar)) {
      return toJson(null, 422, "Multiple files are not allowed!", res);
    }

    if (!avatar.mimetype?.startsWith("image")) {
      return toJson(null, 422, "Invalid Image File!", res);
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return toJson(null, 404, "User Not Found!", res);
    }

    if (user.avatar?.id) {
      //remove avatar file
      await cloudUploader.destroy(user.avatar.id);
    }

    // upload avatar file
    const { secure_url: url, public_id: id } = await cloudUploader.upload(
      avatar.filepath,
      {
        width: 300,
        height: 300,
        crop: "thumb",
        gravity: "face",
      }
    );
    user.avatar = {
      url,
      id,
    };
    await user.save();
    toJson(
      {
        profile: { ...req.user, avatar: user.avatar },
      },
      200,
      null,
      res
    );
  } catch {
    return toJson(null, 500, "Server Error", res);
  }
};

export const getPublicProfile: RequestHandler = async (req, res) => {
  try {
    const profileId = req.params.id;
    if (!isValidObjectId(profileId)) {
      return toJson(null, 422, "Invalid Profile Id!", res);
    }

    const user = await User.findById(profileId);
    if (!user) {
      return toJson(null, 404, "User Not Found!", res);
    }

    toJson(
      {
        profile: {
          id: user._id,
          name: user.name,
          avatar: user.avatar.url,
        },
      },
      200,
      null,
      res
    );
  } catch {
    return toJson(null, 500, "Server Error", res);
  }
};
