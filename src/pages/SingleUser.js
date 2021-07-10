import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

import UserInfo from "../components/UserBio/UserInfo"
import UserContest from "../components/UserBio/UserContest"
import ProblemVerdict from "../components/ProblemVerdict/ProblemVerdict"
import ProblemLanguage from "../components/ProblemLanguage/ProblemLanguage"
import RatingGraph from "../components/RatingGraph/RatingGraph"
import ProblemTagsGraph from "../components/ProblemTagsGraph/ProblemTagsGraph"
import ProblemRatingGraph from "../components/ProblemRatingGraph/ProblemRatingGraph"
import ProblemIndexGraph from "../components/ProblemIndexGraph/ProblemIndexGraph"
import Footer from '../components/Footer/Footer';
import './SingleUser.css';

const SingleUser = () => {
    let lastName;

    const [currname, setCurrname] = useState('');
    const [username, setUsername] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [userContest, setUserContest] = useState('');
    const [userSubmissions, setUserSubmissions] = useState('');

    const fetchItems = async () => {
        // console.log(currname, username);

        const resultUI = await axios(`https://codeforces.com/api/user.info?handles=${currname}`);
        let user = resultUI.data.result[0];
        setUserInfo(user);


        const resultUC = await axios(`https://codeforces.com/api/user.rating?handle=${currname}`);
        user = resultUC.data.result;
        setUserContest(user);


        const resultUS = await axios(`https://codeforces.com/api/user.status?handle=${currname}`)
        user = resultUS.data.result;
        setUserSubmissions(user);


    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e.target);
        setUsername(currname);
        // console.log(currname, username);
        fetchItems();
        
    }

    function render() {
        lastName = username;
        // console.log(currname, username, userInfo,lastName);
        
        if (userInfo && username === userInfo.handle) {

            return (
                <>

                    <div className="user-bio">
                        <div className="user-bio-component">
                            <UserInfo userInfo={userInfo} username={username} />
                        </div>
                        <div className="user-bio-component">
                            <UserContest userContest={userContest} username={username} />
                        </div>
                    </div>

                    <div className="graph-components" >
                        <RatingGraph userContest={userContest} />
                    </div>

                    <div className="pie-chart">
                        <div className="pie-chart-component" >
                            <ProblemVerdict userSubmissions={userSubmissions} />
                        </div>
                        <div className="pie-chart-component" >
                            <ProblemLanguage userSubmissions={userSubmissions} />
                        </div>
                    </div>



                    <div className="graph-components">
                        <ProblemTagsGraph userSubmissions={userSubmissions} />
                    </div>
                    <div className="graph-components">
                        <ProblemIndexGraph userSubmissions={userSubmissions} />
                    </div>
                    <div className="graph-components last">
                        <ProblemRatingGraph userSubmissions={userSubmissions} />
                    </div>

                    <Footer />
                </>
            )
        }
    }

    return (
        <div>
            <form noValidate autoComplete="on" onSubmit={handleSubmit} className="form" >
                <TextField
                    className="text-input"
                    onChange={(e) => setCurrname(e.target.value)}
                    label="Codeforces Username *"
                    variant="outlined"
                    color="primary"
                // required
                />
                <Button
                    className="btn"
                    type="submit"
                    color="secondary"
                    variant="contained"
                >
                    Submit
                </Button>
            </form>
            {username !== lastName && render()}
            
        </div>
    )
}

export default SingleUser
