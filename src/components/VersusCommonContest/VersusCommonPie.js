import { Pie } from "react-chartjs-2";

const VersusCommonPie = ({ userContest1, userContest2 }) => {
    let contest1 = new Map();
    let one=0,two=0,draw=0;

    let username1 = userContest1.length>0 ? userContest1[0].handle : '';
    let username2 = userContest2.length>0 ? userContest2[0].handle : '';

    for (let i = 0; i < userContest1.length; i++) {
        contest1.set(userContest1[i].contestId, userContest1[i]);
    }
    for (let i = 0; i < userContest2.length; i++) {
        if (!contest1.has(userContest2[i].contestId)) {
            continue;
        }

        let diff=contest1.get(userContest2[i].contestId).rank-userContest2[i].rank;
        if(diff<0){
            one++;
        }
        else if(diff>0){
            two++;
        }
        else{
            draw++;
        }
    }

    const data = {
        labels: [username1,username2,'Tied'],
        datasets: [
            {
                label: "Head-To-Head",
                data: [one,two,draw],
                backgroundColor: [
                    "red",
                    "blue",
                    "orange",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Head-to-Head'
            }
        },
    };

    return (
        <div>
            <Pie data={data} 
                options={options} 
                height={400} 
            />
        </div>
    )
}

export default VersusCommonPie
