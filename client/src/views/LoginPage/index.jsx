import LoginForm from "./Form"

function LoginPage() {
    return (

        <div className="w-screen min-h-[calc(70vh-68px)] flex justify-center items-center">
            <div className="w-[calc(100vw-2rem)] sm:w-1/2 xl:w-1/4 bg-slate-100 dark:bg-slate-600 border-2 rounded dark:border-slate-800 shadow-lg px-2 py-3">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage