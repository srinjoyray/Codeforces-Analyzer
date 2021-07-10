import { Line } from 'react-chartjs-2';
import moment from 'moment';


const RatingGraph = ({userContest}) => {
    
    const data = {
        labels: [],
        datasets: [
          {
            label: 'Rating',
            data: [],
            fill: false,
            backgroundColor: 'rgb(228,28,28,1)',
            borderColor: 'rgba(228,28,28,0.3)',
          },
        ],
    };

    
    userContest = Array.from(userContest);
    
    for(let i=0;i<userContest.length;i++){    
        let dateSeconds=userContest[i].ratingUpdateTimeSeconds;
        let rating=userContest[i].newRating;
        var date = new Date(null);
        date.setTime(dateSeconds*1000);
        
        let momentDate = moment(date).format('MMM D, YYYY');
        
        data.datasets[0].data.push({x: momentDate, y:rating});
        
    }


    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              type: 'time',
              time: {
               
                month: 'YYYY MMM',
                
              }
            }
          ],
        },
        plugins: {
            title: {
                display: true,
                text: 'Rating Graph'
            },
            legend: {
              display:false
            }

        },
        animation: {
          duration: 0
        },
        responsive: true,
        maintainAspectRatio: false,
      };

    return (
        <div className="rating-graph">
            <Line 
                data={data} 
                options={options} 
                height={400}
            />
        </div>
    )
}

export default RatingGraph
