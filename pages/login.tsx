import useLocalStorage from "../hooks/useLocalStorage";
import User from "../models/user";
import {useRouter} from "next/router";
import Link from "next/link";

const Login = () => {
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
    const user = users.find(u => u.email === e.currentTarget.email.value);
    if (user && user.password === e.currentTarget.password.value) {
      setCurrentUser(user);
      router.push("/").then(() => window.location.reload());
    } else {
      alert("Invalid credentials");
    }
  }

  return (
      <div className="md:container mx-auto flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-end items-center my-6">
          <div>
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
              <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
                 href="#">
                Forgot Password?
              </a>
            </div>
            <Link href="/register" >
              <span className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">
              {"Don't have an account?"}
              </span>
            </Link>
          </div>
        </form>
      </div>
  );
};

export default Login;