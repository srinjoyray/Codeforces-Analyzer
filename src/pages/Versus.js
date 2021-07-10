import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

import VersusRatingGraph from "../components/VersusRatingGraph/VersusRatingGraph"
import VersusCommonContest from "../components/VersusCommonContest/VersusCommonContest"
import VersusProblemIndexGraph from "../components/VersusProblemIndexGraph/VersusProblemIndexGraph"
import VersusProblemRatingGraph from "../components/VersusProblemRatingGraph/VersusProblemRatingGraph"
import VersusUserInfo from "../components/VersusUser/VersusUserInfo"
import VersusUserContest from "../components/VersusUser/VersusUserContest"
import VersusSubmissionsCompare from "../components/VersusSubmissionsCompare/VersusSubmissionsCompare"
import VersusCommonPie from "../components/VersusCommonContest/VersusCommonPie"
import Footer from '../components/Footer/Footer';
import './Versus.css';


const Versus = () => {

    const [currname1, setCurrname1] = useState('');
    const [username1, setUsername1] = useState('');
    const [userInfo1, setUserInfo1] = useState('');
    const [userContest1, setUserContest1] = useState('');
    const [userSubmissions1, setUserSubmissions1] = useState('');

    const [currname2, setCurrname2] = useState('');
    const [username2, setUsername2] = useState('');
    const [userInfo2, setUserInfo2] = useState('');
    const [userContest2, setUserContest2] = useState('');
    const [userSubmissions2, setUserSubmissions2] = useState('');

    const fetchItemsVersus = async () => {
        
        const resultUI1 = await axios(`https://codeforces.com/api/user.info?handles=${currname1}`);
        let user = resultUI1.data.result[0];
        setUserInfo1(user);

        const resultUI2 = await axios(`https://codeforces.com/api/user.info?handles=${currname2}`);
        user = resultUI2.data.result[0];
        setUserInfo2(user);

        const resultUC1 = await axios(`https://codeforces.com/api/user.rating?handle=${currname1}`);
        user = resultUC1.data.result;
        setUserContest1(user);

        const resultUC2 = await axios(`https://codeforces.com/api/user.rating?handle=${currname2}`);
        user = resultUC2.data.result;
        setUserContest2(user);

        const resultUS1 = await axios(`https://codeforces.com/api/user.status?handle=${currname1}`)
        user = resultUS1.data.result;
        setUserSubmissions1(user);

        const resultUS2 = await axios(`https://codeforces.com/api/user.status?handle=${currname2}`)
        user = resultUS2.data.result;
        setUserSubmissions2(user);


    }


    const handleSubmitVersus = async(e) => {
        e.preventDefault();
        setUsername1(currname1);
        setUsername2(currname2);
        console.log(currname1,currname2);
        fetchItemsVersus();
    }


    function render() {
        // console.log(userInfo1, userInfo2);
        if (userInfo1 && username1 === userInfo1.handle && userInfo2 && username2 === userInfo2.handle) {
            return (
                <>
                    <div className="versus-user-bio">
                        <div className="versus-user-bio-component">
                            <VersusUserInfo userInfo1={userInfo1} userInfo2={userInfo2} />
                        </div>
                        <div className="versus-user-bio-component">
                            <VersusUserContest userContest1={userContest1} userContest2={userContest2} />
                        </div>
                    </div>
                    <div className="versus-graph-components" >
                        <VersusRatingGraph userContest1={userContest1} userContest2={userContest2} />
                    </div>

                    <div className="versus-pie-chart">
                        <div className="versus-pie-chart-component" >
                            <VersusCommonPie userContest1={userContest1} userContest2={userContest2} />
                        </div>
                        <div className="versus-pie-chart-component" >
                            <VersusSubmissionsCompare userSubmissions1={userSubmissions1} userSubmissions2={userSubmissions2} username1={username1} username2={username2} />
                        </div>
                    </div>


                    <div className="versus-graph-components" >
                        <VersusProblemIndexGraph userSubmissions1={userSubmissions1} userSubmissions2={userSubmissions2} username1={username1} username2={username2} />
                    </div>
                    <div className="versus-graph-components" >
                        <VersusProblemRatingGraph userSubmissions1={userSubmissions1} userSubmissions2={userSubmissions2} username1={username1} username2={username2} />
                    </div>
                    <div className="versus-graph-components versus-last" >
                        <VersusCommonContest userContest1={userContest1} userContest2={userContest2} />
                    </div>
                    <Footer/>
                </>
            )
        }
    }
    return (
        <div>
            <form noValidate autoComplete="on" onSubmit={handleSubmitVersus} className="versus-form" >
                <div className="versus-text-input">
                    <TextField
                        className="versus-text-input-component"
                        onChange={(e) => setCurrname1(e.target.value)}
                        label="Codeforces Username *"
                        variant="outlined"
                        color="primary"
                    // required
                    />
                    <TextField
                        className="versus-text-input-component"
                        onChange={(e) => setCurrname2(e.target.value)}
                        label="Codeforces Username *"
                        variant="outlined"
                        color="primary"
                    // required
                    />
                </div>
                <Button
                    className="versus-btn"
                    type="submit"
                    color="secondary"
                    variant="contained"
                >
                    Submit
                </Button>
            </form>
            {render()}
            

        </div>
    )
}

export default Versus
