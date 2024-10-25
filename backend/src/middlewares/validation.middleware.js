export const validateRegistration = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  next();
};

export const validateEvent = (req, res, next) => {
  const { title, startTime, endTime } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!startTime || !endTime) {
    return res
      .status(400)
      .json({ message: "Start time and end time are required" });
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  if (end <= start) {
    return res
      .status(400)
      .json({ message: "End time must be after start time" });
  }

  next();
};
