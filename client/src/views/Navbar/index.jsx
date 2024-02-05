import { Link } from "react-router-dom"
import { setLogout } from "../../state"
import { useDispatch, useSelector } from "react-redux"
import { Navbar, DarkThemeToggle } from 'flowbite-react';

export default function NavbarComp() {

    const dispatch = useDispatch();
    const isAuth = Boolean(useSelector((state) => state.token))

    return (
        <>
            <Navbar fluid rounded>
                <Navbar.Brand as={Link} to={"/"} className="text-5xl text-orange-400">expenseTracker</Navbar.Brand>
                <div className="flex grow justify-start pl-4"><DarkThemeToggle className="rounded-3xl border-4 border-gray-300 dark:border-gray-700" /></div>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link as={Link} to={"/dashboard"} className="-mx-3 lg:mx-3 text-lg md:text-lg font-bold">Dashboard</Navbar.Link>
                    <Navbar.Link as={Link} to={"/wallets"} className="-mx-3 lg:mx-3 text-lg md:text-lg font-bold">Wallets</Navbar.Link>
                    <Navbar.Link as={Link} to={"/spending"} className="-mx-3 lg:mx-3 text-lg md:text-lg font-bold">Spending</Navbar.Link>
                    <Navbar.Link as={Link} to={"/"} className="-mx-3 lg:mx-3 text-lg md:text-lg font-bold" onClick={() => dispatch(setLogout())} active>{isAuth ? "Logout" : "Login"}</Navbar.Link>
                </Navbar.Collapse>
            </Navbar >
        </>
    )
}