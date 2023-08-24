const { supabase } = require("../config/supabase");
const Message = require("../utils/languages/language");

const Register = async (req, res, next) => {
  try {
    const { email, password, username, age, gender } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log("Register error ---------> ", error);
      return res.status(400).json({ error: error.message });
    }
    console.log("user info  ---------> ", {
      user_id: data.user.id,
      username,
      age,
      gender,
    });
    const { data: updatedUser, error: profileError } = await supabase
      .from("user_info")
      .insert([{ user_id: data.user.id, username, age, gender }], {
        returning: "minimal",
      });

    // console.log("Register updatedUser ---------> ", updatedUser);
    if (profileError) {
      // console.log("Register userinfoError ---------> ", error);
      return res.status(400).json({ error: profileError.message });
    }

    // console.log("Register user ---------> ", data.user);
    const message = Message(req.query.lang || "en", "Auth", "RegisterSucc");
    return res.status(200).json({ message, user: data.user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      // console.log("Login error ---------> ", error);
      return res.status(401).json({ error: error.message });
    }
    // console.log("Login user ---------> ", data);
    const message = Message(req.query.lang || "en", "Auth", "LoginSucc");
    return res.status(200).json({ message, data });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getUser = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ message: "User get Successfully!!", user: req.user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addProfile = async (req, res, next) => {
  try {
    const fileData = req.file.buffer;
    const fileName = req.file.originalname;
    const extension = fileName.split(".")[1];
    console.error("extension---------- :", extension);
    const path = `profiles/profile_${Date.now()}.${extension}`;
    const { data, error } = await supabase.storage
      .from("demo-project")
      // .upload(fileName + new Date(), fileData)
      .upload(path, fileData);
    if (error) {
      console.error("File upload error:", error);
      res.status(500).send("File upload failed.");
    } else {
      console.log("File uploaded successfully:", data);

      const { data: profile } = await supabase.storage
        .from("demo-project")
        .getPublicUrl(path);
      return res
        .status(200)
        .json({ message: "File uploaded successfully", profile });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("An error occurred.");
  }
};

module.exports = {
  Login,
  Register,
  getUser,
  addProfile,
};
