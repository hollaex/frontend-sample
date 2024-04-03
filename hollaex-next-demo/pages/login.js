import Logo from "@/components/logo";
import axios from "axios";
import Link from "next/link";

const Login = () => {
  // const [userEmail, setUserEmail] = useState()
  const handleLogin = () => {
    axios
      .post("https://api.sandbox.hollaex.com/v2/login", {
        email: "purab.shah93@gmail.com",
        password: "Purab@123",
        captcha:
          "03AFcWeA6Cg-h6Cwb0vxLg8f7YZkDTbu1sK36N4mY1rzFC7fhHNgbc_zuRNNXVdICEK4N00R80s-gHAO1Hrr1FQNFEXS3RXWy23PCrCf2farZooIKtDkBgetm4UmB1ItKWll4csM5zliRo1ZAF2dzSR-BWIW2aoAnxbN_npH5u8CfSQxnUWvN18E8UX1tAqS4-_vweOzWvzYHqAyC_RU8plH_8szai6Z_Jtvs2LngoTlNYryJpFQvUkhcpyIm3A7-8PDIr9zm3A3FGboGITk40pmlYiEWPXUCltAtEmkl0tOMSfBGlMDXs7VzMBfRzD_DsuBhHNFZ7oOgrhqIpteh0VD4cz_Dtom-VWXX8TTo0bWe9MHc7Bt-nsxE3Ftf8dfiZNU18isa1a0MAyI1udqK34EFEayZq4bpvSPA7WWfJXUj8rq7qNZzPOSiAkgJcaK3KwtUrxT8I7vxwLKSPKafIA_Svda8DB7Baky3IN1N5W0HQwix1DG2GkteqqM_FqTbsj39L27U7jy2cJJd0RofVBdaSsKIAWSmG7OJjIh7QK4Vfv0QBSghmMg-qiaK55ht8kQqo6MrVfXI-siLKxnxNrROHqlZTHIS7gW8-s-aKoTokMdqQev_xIXy7WDtiFi4Mquc9rdQuRNtWNISG-JXGIpW0NREG1qrBxQ",
      })
      .then((res) => {
        console.log("LOGIN OP", res.data.token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Logo />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </div>

        <div className="text-sm text-center">
          <p className="font-medium text-gray-900">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
