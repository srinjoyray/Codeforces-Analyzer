import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const ProblemVerdict = ({userSubmissions}) => {
   
    let ac=0,tle=0,wa=0,rte=0,others=0,total;
    total=userSubmissions.length;
    for(let i=0;i<userSubmissions.length;i++){
        if(userSubmissions[i].verdict==="OK"){
            ac++;
        }
        else if(userSubmissions[i].verdict==="TIME_LIMIT_EXCEEDED"){
            tle++;
        }
        else if(userSubmissions[i].verdict==="WRONG_ANSWER"){
            wa++;
        }
        else if(userSubmissions[i].verdict==="RUNTIME_ERROR"){
            rte++;
        }
        else{
            others++;
        }
    }
    
    const data = {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: [
                "rgba(138, 216, 38, 0.8)",
                "rgba(228, 28, 28, 0.8)",
                "rgba(4, 119, 198, 0.8)",
                'rgba(198, 8, 140, 0.8)',
                'rgba(155, 159, 182, 0.8)',
                'rgba(205, 170, 30, 0.8)',
            ],
            borderColor: [
                "rgba(138, 216, 38, 1)",
                "rgba(228, 28, 28, 1)",
                "rgba(4, 119, 198, 1)",
                'rgba(198, 8, 140, 1)',
                'rgba(155, 159, 182, 1)',
                'rgba(205, 170, 30, 1)',
            ],
            borderWidth: 1,
            
          },
        ],
    };
    data.labels.push('Accepted');
    data.datasets[0].data.push(ac);
    data.labels.push('Wrong Answer');
    data.datasets[0].data.push(wa);
    data.labels.push('Time Limit Exceeded');
    data.datasets[0].data.push(tle);
    data.labels.push('Run Time Error');
    data.datasets[0].data.push(rte);
    data.labels.push('Others');
    data.datasets[0].data.push(others);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Verdicts',
            },
            datalabels: {
                display: true,
                align: 'bottom',
                backgroundColor: '#ccc',
                borderRadius: 3,
                font: {
                  size: 18,
                }
            },
        }
    };
    
    return (
        <div>
            <Pie 
                data={data} 
                options={options}
                height={400}
            />
        </div>
    )
}

export default ProblemVerdict
