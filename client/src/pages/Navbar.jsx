import React from 'react'
import { Outlet, Link ,useParams,useNavigate } from 'react-router-dom'

function Navbar() {

    const { username } = useParams(); 

    const nav =useNavigate()
    function handleLogout(){

        nav("/")


    }
    return (
        <div>
            <header>

                <nav>

                    <div className='navlink'>
                    <Link to="" className='link'>Home</Link>
                    <Link to="EmployeList" className='link'>Employ List</Link>
                    </div>

                    <div>
                    <p>{username}</p>
                    <button onClick={handleLogout}> Logout</button>
                    </div>
                    


                </nav>
            </header>


            <Outlet />
        </div>
    )
}

export default Navbar