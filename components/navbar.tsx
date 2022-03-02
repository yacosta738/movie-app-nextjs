import Image from "next/image";
import useLocalStorage from "../hooks/useLocalStorage";
import User from "../models/user";
import {useRouter} from "next/router";

export default function Navbar() {
  const router = useRouter();
  const [currentUser] = useLocalStorage<User>("currentUser", {
    id: Math.random(),
    name: "",
    password: "",
    email: ""
  });
  const logout = () => {
    localStorage.removeItem("currentUser");
    router.push("/").then(() => window.location.reload());
  };
  const login = () => {
    router.push("/login");
  };
  const register = () => {
    router.push("/register");
  };
  return (
      <header className="my-6 flex justify-between items-center">
        <div className="flex flex-row items-center justify-start">
          <Image
              src="/images/logo.png"
              alt="Movie App Logo"
              width={50}
              height={50}
              className="mx-auto"
          />
          <h1 className="text-center text-3xl font-bold mx-2">Movie App</h1>
        </div>
        <div className="flex justify-end items-center">
          {currentUser.name ? (
              <div className="flex flex-row items-center">
                <p className="text-sm text-gray-600 mx-4">
                  Welcome, {currentUser.name}
                </p>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={logout}>
                  Logout
                </button>
              </div>
          ) : (
              <div className="flex flex-row items-center">
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mx-4"
                    onClick={login}>
                  Login
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={register}>
                  Register
                </button>
              </div>
          )}
        </div>
      </header>
  );
}