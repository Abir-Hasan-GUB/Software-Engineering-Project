import React, { useContext } from 'react';
import './DashBoardTop.css';
import people from '../../../images/dashboard/people.jpg';
import flag from '../../../images/dashboard/bdFlag.png';
import { UserContext } from '../../../App';
import userImage from '../../../images/userIcon.png';

const DashBoardTop = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 dashBoardMainDiv px-0">
                    <div className="dashBoardBar bg-secondary align-items-center d-flex justify-content-end">
                        <img className="img-fluid flag mr-5" src={flag} alt="flag"/>
                        <h4 className="text-light mr-5"><i class="fas fa-bell text-light"></i></h4>
                        <h4 className="text-warning">Hi, <span className="text-light mr-3">{loggedInUser.name}</span> </h4>
                        <img className="img-fluid avater bg-light mr-3" src={loggedInUser.photo ? loggedInUser.photo : userImage} alt="avater"/>
                        <h4 className="text-light"><i class="fas fa-cog mr-3 px-3"></i></h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardTop;