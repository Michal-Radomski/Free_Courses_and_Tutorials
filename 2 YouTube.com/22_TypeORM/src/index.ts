import { AppDataSource } from "./data-source";
// import { User } from "./entity/User";
// import { Post } from "./entity/Post";

AppDataSource.initialize()
  .then(async () => {
    //* V1
    // const user = new User();

    // user.name = "Jane Doe";
    // user.email = "jane@email.com";
    // user.role = "admin";

    // await AppDataSource.manager.save(user);
    // console.log("User created successfully");

    //* V2
    console.log("DB synchronized successfully");
  })
  .catch((error) => console.log(error));
