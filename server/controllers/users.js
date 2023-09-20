import User from "../models/User.js";
import bcrypt from "bcrypt";

// READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); //CHANGED NO PASSWORD return
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formatttedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formatttedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formatttedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formatttedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      id,
      location,
      occupancy,
      email,
      currentEmail,
      picturePath,
      password,
      currentPassword,
    } = req.body;
    let user = await User.findById(id);
    let findEmail = await User.findOne({ email: email });
    let errors = [];

    // EMAIL
    currentEmail === "" && email === ""
      ? null
      : currentEmail !== user.email
      ? errors.push("Wrong email")
      : findEmail === null
      ? (user.email = email)
      : errors.push("Email exists");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    password === "" && currentPassword === ""
      ? null
      : isMatch
      ? (user.password = hashedPassword)
      : errors.push("Wrong password");

    location === "" ? null : (user.location = location);
    occupancy === "" ? null : (user.occupation = occupancy);
    picturePath === "" ? null : (user.picturePath = picturePath);

    const update = await User.findByIdAndUpdate(id, user, { new: true });
    const sterilizedUser = { ...update._doc, password: "SECRET" };

    res.status(200).json({ user: sterilizedUser, errors: errors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
