import { Link, useNavigate } from "react-router-dom";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, toggleTheme } from "../features/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);


  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };

  return (
    <header className="navbar bg-base-300 w-full">
      <header className=" navbar align-element">
        <div className="flex-1 px-2 lg:flex-none">
          <Link to="/" className="text-lg font-bold">
            iFound
          </Link>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch gap-3">
            <label className="swap swap-rotate">
              <input type="checkbox" onChange={handleTheme} />
              <BsSunFill className="swap-on h-4 w-4" />
              <BsMoonFill className="swap-off h-4 w-4" />
            </label>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost rounded-btn"
              >
                Kabinet
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
              >
                {user ? (
                  <>
                    <li>
                      <Link to="/profile">Kabinet</Link>
                    </li>
                    <li>
                      <Link to="/found">Topib oldim</Link>
                    </li>
                    <li>
                      <Link to="/list">Topganlarim</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Chiqish</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Registratsiya</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </header>
  );
};

export default Header;
