const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

const auth = () => async (req, res, next) => {
  const JWT = getToken(req);
  console.log("JWT -----------> ", JWT);
  if (JWT) {
    const { data, error } = await supabase.auth.getUser(JWT);
    if (error) {
      res.status(401).json(error);
    } else {
      req.user = data.user;
      next();
    }
  } else {
    res.status(401).json({ error: "Token not provide" });
  }
};
module.exports = auth;
