import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    const user = new User();

    user.name = "John Doe";
    user.email = "john@email.com";
    user.role = "admin";

    await AppDataSource.manager.save(user);
    console.log("User created successfully");
  })
  .catch((error) => console.log(error));
