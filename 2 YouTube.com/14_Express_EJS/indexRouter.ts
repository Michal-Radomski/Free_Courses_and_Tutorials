import * as dotenv from "dotenv";
dotenv.config();
import express, { Router, Request, Response } from "express";
import fetch from "node-fetch";

const indexRouter: Router = express.Router();

indexRouter.get("/", async (req: Request, res: Response) => {
  await console.log("req.ip:", req.ip);
  await res.render("pages/index", {
    city: null,
    des: null,
    icon: null,
    temp: null,
  });
});

indexRouter.post("/", async (req: Request, res: Response) => {
  const city = req.body.city as string;
  const url_api =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric` as string;

  try {
    await fetch(url_api)
      .then((res) => res.json())
      .then((data) => {
        // console.log({ data });
        if (data.message === "city not found") {
          res.render("pages/index", {
            city: data.message,
            des: null,
            icon: null,
            temp: null,
          });
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const icon = data.weather[0].icon;
          const temp = data.main.temp;
          // console.log({ city, des, icon, temp });

          res.render("pages/index", {
            city: city,
            des: des,
            icon: icon,
            temp: temp,
          });
        }
      });
  } catch (error) {
    console.log({ error });
    res.render("pages/index", {
      city: "something wrong",
      des: null,
      icon: null,
      temp: null,
    });
  }
});

indexRouter.get("/*", async (_req: Request, res: Response) => {
  res.send("<h1 style='color:blue;text-align:center'>Page Not Found</h1>");
});

export default indexRouter;
