import { Line } from 'react-chartjs-2';
import moment from 'moment';

const VersusRatingGraph = ({userContest1,userContest2}) => {
    let datesMap= new Map();
    let datesMap1= new Map();
    let datesMap2=new Map();

    let username1 = userContest1.length>0 ? userContest1[0].handle : '';
    let username2 = userContest2.length>0 ? userContest2[0].handle : '';

    const data = {
        labels: [],
        datasets: [
          {
            label: username1,
            data: [],
            fill: false,
            backgroundColor: 'red',
            borderColor: 'rgba(255,0,0,0.2)',
          },
          {
            label: username2,
            data: [],
            fill: false,
            backgroundColor: 'blue',
            borderColor: 'rgba(25,25,112, 0.2)',
          }
        ],
    };

    
    userContest1 = Array.from(userContest1);  
    for(let i=0;i<userContest1.length;i++){    
        let dateSeconds=userContest1[i].ratingUpdateTimeSeconds;
        let rating=userContest1[i].newRating;
        
        datesMap.set(dateSeconds,1);
        datesMap1.set(dateSeconds,rating);
    }
  
    userContest2 = Array.from(userContest2);  
    for(let i=0;i<userContest2.length;i++){    
        let dateSeconds=userContest2[i].ratingUpdateTimeSeconds;
        let rating=userContest2[i].newRating;
        
        datesMap.set(dateSeconds,1);
        datesMap2.set(dateSeconds,rating);
    }

    var datesMapAsc = new Map([...datesMap.entries()].sort());

    for(let[key,value] of datesMapAsc){
      var date = new Date(null);
      date.setTime(key*1000);
      let momentDate = moment(date).format('MMM D, YYYY');
      data.labels.push(momentDate);  
      if(datesMap1.has(key)){
        let rating=datesMap1.get(key);
        data.datasets[0].data.push(rating);
      }
      else{
        data.datasets[0].data.push(null);
      }
      if(datesMap2.has(key)){
        let rating=datesMap2.get(key);
        data.datasets[1].data.push(rating);
      }
      else{
        data.datasets[1].data.push(null);
      }
    }

    const options = {
        scales: {
          y: {
            beginAtZero: true
          },
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
            }
        },
        animation: {
          duration: 0
        },
        responsive: true,
        maintainAspectRatio: false,
        spanGaps: true,
      };

    return (
        <div>
            <Line 
                data={data} 
                options={options} 
                height={400}
            />
        </div>
    )
}

export default VersusRatingGraph
