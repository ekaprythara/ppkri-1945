import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Button from "@/Components/Button";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        // email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head title="Login Admin" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div className="h-full mx-auto w-11/12 z-10 absolute flex flex-col items-end justify-center">
                <div className="bg-[#ffe] w-[400px] rounded-xl p-5 text-black flex flex-col justify-center items-center">
                    <h1 className="font-caudex text-5xl mb-5 text-center">
                        Login
                    </h1>
                    <form
                        onSubmit={submit}
                        className="w-full flex flex-col gap-4 font-lato"
                    >
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="username" value="Username" />
                            <TextInput
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                className="w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                            />
                            <InputError message={errors.username} />
                        </div>
                        {/* <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError message={errors.email} />
                        </div> */}
                        <div className="mt-2">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError message={errors.password} />
                        </div>
                        {/* 
                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div> */}

                        <div className="w-full mt-4">
                            <button
                                disabled={processing}
                                className="bg-blue-600 w-full hover:bg-blue-600/90 text-white transition-colors duration-300 rounded-md py-3 px-5 font-lato"
                            >
                                Login
                            </button>
                            {/* {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Forgot your password?
                                </Link>
                            )} */}
                            {/* 
                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Log in
                            </PrimaryButton> */}
                        </div>
                    </form>
                </div>
            </div>
            <div className="relative h-screen -z-10 w-full">
                <div className="bg-black/40 h-full w-full absolute" />
                <div className="bg-monumen bg-cover bg-center bg-no-repeat h-full w-full" />
            </div>
        </>
    );
}
