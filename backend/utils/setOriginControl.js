export const setOriginControl = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "*");
  next();
};
