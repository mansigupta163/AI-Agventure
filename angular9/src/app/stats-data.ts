import * as Highcharts from "highcharts";
declare var require: any;

export class StatsData {
  id: string;
  timestamp: string;
  peopleInFrame: string;
  noOfViolations: string;
  locality: string;
  latitude: string;
  longitude: string;
  localityType: string;
  zoneCategory: string;
  containmentZoneDistance: string;
  lastDayViolationCount: string;
  avgHourlyViolations: string;
  activeCovidCasesInArea: string;
}

export class WeedStats {
  class: string;
  score: string;
  image: string;
}

export class DiseaseStats {
  disease: string;
  deadLeaf: string;
  greenLeaf: string;
}

export class FileType {
  img: boolean;
  vdo: boolean;
}

export const fileType: FileType =
{
  img: false,
  vdo: false
};

export const weedData: WeedStats[] = [
  {
    class: 'weed',
    score: '40%',
    image: ''
  },
  {
    class: 'weed',
    score: '30%',
    image: ''
  }
]

export const diseaseData: DiseaseStats[] = [
  {
    disease: '40%',
    deadLeaf: '30%',
    greenLeaf: '30%'

  },
  {
    disease: '60%',
    deadLeaf: '30%',
    greenLeaf: '10%'

  },

]


export const areaData: StatsData[] = [
  {
    id: '1',
    timestamp: 'May 10 2020 11:00:59',
    peopleInFrame: '23',
    noOfViolations: '50',
    locality: 'Noida',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'Orange Zone',
    containmentZoneDistance: '2',
    lastDayViolationCount: '30',
    avgHourlyViolations: '2',
    activeCovidCasesInArea: '10'
  },
  {
    id: '2',
    timestamp: 'May 31 2020 10:27:53',
    peopleInFrame: '28',
    noOfViolations: '90',
    locality: 'Delhi',
    latitude: '28.491',
    longitude: '77.508',
    localityType: 'Old-Age Home',
    zoneCategory: 'Red Zone',
    containmentZoneDistance: '19',
    lastDayViolationCount: '88',
    avgHourlyViolations: '4',
    activeCovidCasesInArea: '20'
  },
  {
    id: '3',
    timestamp: 'May 10 2020 11:00:59',
    peopleInFrame: '23',
    noOfViolations: '50',
    locality: 'Punjab',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'Orange Zone',
    containmentZoneDistance: '2',
    lastDayViolationCount: '30',
    avgHourlyViolations: '2',
    activeCovidCasesInArea: '10'
  },
  {
    id: '4',
    timestamp: 'May 10 2020 11:00:59',
    peopleInFrame: '23',
    noOfViolations: '50',
    locality: 'Haryana',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'Orange Zone',
    containmentZoneDistance: '2',
    lastDayViolationCount: '30',
    avgHourlyViolations: '2',
    activeCovidCasesInArea: '10'
  },
  {
    id: '5',
    timestamp: 'May 10 2020 11:00:59',
    peopleInFrame: '23',
    noOfViolations: '50',
    locality: 'Jharkhand',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'Orange Zone',
    containmentZoneDistance: '2',
    lastDayViolationCount: '30',
    avgHourlyViolations: '2',
    activeCovidCasesInArea: '10'
  },
  {
    id: '5',
    timestamp: 'May 10 2020 11:00:59',
    peopleInFrame: '23',
    noOfViolations: '50',
    locality: 'Uttar Pradesh',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'Orange Zone',
    containmentZoneDistance: '2',
    lastDayViolationCount: '30',
    avgHourlyViolations: '2',
    activeCovidCasesInArea: '10'
  },
  {
    id: '5',
    timestamp: 'May 10 2020 11:00:59',
    peopleInFrame: '23',
    noOfViolations: '50',
    locality: 'Himachal Pradesh',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'Orange Zone',
    containmentZoneDistance: '2',
    lastDayViolationCount: '30',
    avgHourlyViolations: '2',
    activeCovidCasesInArea: '10'
  },
  {
    id: '5',
    timestamp: 'May 10 2020 11:00:59',
    peopleInFrame: '23',
    noOfViolations: '50',
    locality: 'Gujrat',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'Orange Zone',
    containmentZoneDistance: '2',
    lastDayViolationCount: '30',
    avgHourlyViolations: '2',
    activeCovidCasesInArea: '10'
  },
  {
    id: '5',
    timestamp: 'May 10 2020 11:00:59',
    peopleInFrame: '23',
    noOfViolations: '50',
    locality: 'Bihar',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'Orange Zone',
    containmentZoneDistance: '2',
    lastDayViolationCount: '30',
    avgHourlyViolations: '2',
    activeCovidCasesInArea: '10'
  },
  {
    id: '5',
    timestamp: 'May 10 2020 11:00:59',
    peopleInFrame: '23',
    noOfViolations: '50',
    locality: 'Assam',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'Orange Zone',
    containmentZoneDistance: '2',
    lastDayViolationCount: '30',
    avgHourlyViolations: '2',
    activeCovidCasesInArea: '10'
  },
  {
    id: '5',
    timestamp: 'May 10 2020 11:00:59',
    peopleInFrame: '23',
    noOfViolations: '50',
    locality: 'Madhya Pradesh',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'Orange Zone',
    containmentZoneDistance: '2',
    lastDayViolationCount: '30',
    avgHourlyViolations: '2',
    activeCovidCasesInArea: '10'
  },
  {
    id: '5',
    timestamp: 'May 10 2020 11:00:59',
    peopleInFrame: '23',
    noOfViolations: '50',
    locality: 'Andra Pradesh',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'Orange Zone',
    containmentZoneDistance: '2',
    lastDayViolationCount: '30',
    avgHourlyViolations: '2',
    activeCovidCasesInArea: '10'
  },
];


export const mockData: StatsData[] = [
  {
    id: '2',
    timestamp: 'May 26 2020 03:06:51',
    peopleInFrame: '39',
    noOfViolations: '20',
    locality: 'Golf Vista-Alpha2',
    latitude: '28.501',
    longitude: '77.51',
    localityType: 'Residential',
    zoneCategory: 'red',
    containmentZoneDistance: '7',
    lastDayViolationCount: '25',
    avgHourlyViolations: '11',
    activeCovidCasesInArea: '3'
  },
  {
    id: '3',
    timestamp: 'May 22 2020 06:00:42',
    peopleInFrame: '11',
    noOfViolations: '15',
    locality: 'Edana-Alpha1',
    latitude: '28.472',
    longitude: '77.488',
    localityType: 'Residential',
    zoneCategory: 'red',
    containmentZoneDistance: '2',
    lastDayViolationCount: '55',
    avgHourlyViolations: '12',
    activeCovidCasesInArea: '1',
  },
  {
    id: '4',
    timestamp: 'May 03 2020 02:15:07',
    peopleInFrame: '49',
    noOfViolations: '13',
    locality: 'Alpha commercial belt- Alpha1',
    latitude: '28.455',
    longitude: '77.499',
    localityType: 'Commercial',
    zoneCategory: 'orange',
    containmentZoneDistance: '1',
    lastDayViolationCount: '30',
    avgHourlyViolations: '13',
    activeCovidCasesInArea: '2'
  },
  {
    id: '5',
    timestamp: 'May 14 2020 05:11:00',
    peopleInFrame: '8',
    noOfViolations: '6',
    locality: 'Sommerville school-Alpha2',
    latitude: '28.496',
    longitude: '77.507',
    localityType: 'School',
    zoneCategory: 'orange',
    containmentZoneDistance: '17',
    lastDayViolationCount: '80',
    avgHourlyViolations: '14',
    activeCovidCasesInArea: '3'
  }

];

export const weedData1: any = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: true,
    type: 'pie'
  },
  title: {
    text: 'Weed Detection in uploaded file'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        connectorColor: 'silver'
      }
    }
  },
  series: [{
    type: undefined,
    name: 'Share',
    data: [
      { name: 'Crop', y: 80.00 },
      { name: 'Weed', y: 20.00 }

    ]
  }]
};

export const diseaseData1: any = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: true,
    type: 'pie'
  },
  title: {
    text: 'Disease Detection in uploaded file | Name - Apple Scab'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        connectorColor: 'silver'
      }
    }
  },
  series: [{
    type: undefined,
    name: 'Share',
    data: [
      { name: 'Disease', y: 32.00 },
      { name: 'Dead Leaf', y: 30.00 },
      { name: 'Healthy Crop', y: 30.00 },
      { name: ' Remaining', y: 8.00 }
    ]
  }]
};

export const rainfallData = {

  title: {
    text: 'Rainfall Prediction for next 7 days'
  },

  yAxis: {
    title: {
      text: 'Rain & Wind Speed'
    },
    accessibility: {
      rangeDescription: 'Range: 0 to 100'
    }
  },

  xAxis: {
    title: {
      text: 'Date'
    },
    categories: ['June 17', 'June 18', 'June 19', 'June 20', 'June 21', 'June 22', 'June 23', 'June 24']
  },

  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  series: [{
    name: 'Rain mm',
    data: [14, 8, 11, 6, 12, 7, 5, 8]
  },
  {
    name: 'Wind Speed km/h',
    data: [17, 18, 21, 24, 25, 19, 13, 19]
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 50
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }

};

export const distanceViolationData1 = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Violations by Locality'
  },
  xAxis: {
    title: {
      text: 'Locality Distance'
    }
  },
  yAxis: {
    title: {
      text: 'Abc'
    },
    accessibility: {
      rangeDescription: 'Range: 0 to 100'
    }
  },
  // legend: {
  //   enabled: false
  // },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 50
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  },
  series: [
    {
      name: ['Edana-Alpha2 5KM'],
      data: [44]
    },
    {
      name: ['Edana-Alpha3 8KM'],
      data: [18]
    },
    {
      name: ['Edana-Alpha4 6KM'],
      data: [22]
    },
    {
      name: ['Edana-Alpha5 9KM'],
      data: [75]
    },
    {
      name: ['Elder Homes-Alpha2 15KM'],
      data: [90]
    }]
};

export const violationCountGraphData2 = {

  title: {
    text: 'Crop Status'
  },

  yAxis: {
    title: {
      text: 'Abc'
    },
    accessibility: {
      rangeDescription: 'Range: 0 to 100'
    }
  },

  xAxis: {
    title: {
      text: 'Date'
    },
    categories: ['May 28', 'May 29', 'May 30', 'May 31', 'June 1', 'June 2', 'June 3', 'June 4', 'June 5']
  },

  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  series: [{
    name: 'xyz',
    data: [50, 12, 48, 38, 10, 54, 66, 88, 90]
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 50
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }

};

export const distanceViolationData2 = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Violations by Locality'
  },
  xAxis: {
    title: {
      text: 'Locality Distance'
    }
  },
  yAxis: {
    title: {
      text: 'Abc'
    },
    accessibility: {
      rangeDescription: 'Range: 0 to 100'
    }
  },
  // legend: {
  //   enabled: false
  // },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 50
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  },
  series: [
    {
      name: ['Elder Homes-Alpha1 8KM'],
      data: [11]
    },
    {
      name: ['Elder Homes-Alpha3 7KM'],
      data: [8]
    },
    {
      name: ['Elder Homes-Alpha4 12KM'],
      data: [25]
    },
    {
      name: ['Elder Homes-Alpha5 17KM'],
      data: [25]
    },
    {
      name: ['Edana-Alpha1 15KM'],
      data: [50]
    }]
};

