import useLocalStorage from "../hooks/useLocalStorage";
import User from "../models/user";
import {useRouter} from "next/router";

const Register = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useLocalStorage<User>("currentUser", {
    id: Math.random(),
    name: "",
    password: "",
    email: ""
  });
  const [users, setUsers] = useLocalStorage<User[]>("users", []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      id: Math.random(),
      // @ts-ignore
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
      email: e.currentTarget.email.value
    };
    setUsers([...users, user]);
    setCurrentUser(user);
    router.push("/");
  };

  return (
      <div className="md:container mx-auto flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-end items-center my-6">
          <div>
            <div className="mb-4">
              <label htmlFor="name"
                     className="block text-grey-darker text-sm font-bold mb-2">Name</label>
              <input type="text" id="name" name="name"
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"/>
            </div>
            <div className="mb-4">
              <label htmlFor="email"
                     className="block text-grey-darker text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" name="email"
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"/>
            </div>
            <div className="mb-4">
              <label htmlFor="password"
                     className="block text-grey-darker text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" name="password"
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"/>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
  );
};

export default Register;