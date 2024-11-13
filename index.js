const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to check if the request is within working hours (9:00 to 17:00, Monday to Friday)
function checkWorkingHours(req, res, next) {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hourOfDay = now.getHours(); // 0 to 23

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next(); // It's within working hours, proceed to the next middleware or route
  } else {
    res.send(
      "Sorry, this website is only available during working hours (Monday to Friday, 9:00 - 17:00)."
    );
  }
}

// Use the middleware globally
app.use(checkWorkingHours);

// Set up static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Routes for the pages
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
