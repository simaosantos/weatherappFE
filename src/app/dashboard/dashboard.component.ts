import { Component, OnInit, ViewChild } from '@angular/core';

import { CityService } from '../city.service';
import { City } from '../city';

import { BaseChartDirective } from 'ng2-charts';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) _chart;

  public city!: City;
  public cities: any;
  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas: any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData: Array<any>;
  public lineBigDashboardChartOptions: any;
  public lineBigDashboardChartLabels: Array<any>;
  public lineBigDashboardChartColors: Array<any>
  public inputValue: string;



  public dataTable: City[];
  public displayedColumns: string[];
  sortedData: City[];


  public directions: any;
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  constructor(private cityService: CityService) {


  }

  addCity() {
    console.log('searched' + this.inputValue)


    let find = this.sortedData.find(o => o.name === this.inputValue);




    this.cityService.getCities([this.inputValue]).subscribe((data: any) => {
      console.log('data', data)
      data.forEach(element => {
        let sunrise = new Date(parseInt(element.sunrise) * 1000);
        element.sunrise = addZero(sunrise.getHours()).toString() + ':' + addZero(sunrise.getMinutes()).toString();
        let sunset = new Date(parseInt(element.sunset) * 1000);
        element.sunset = addZero(sunset.getHours()).toString() + ':' + addZero(sunset.getMinutes()).toString();
        let find = this.sortedData.find(o => o.id === element.id);
        if(find === undefined)
        {
          this.sortedData.push(element)
          this.lineBigDashboardChartData[0].data = this.sortedData.map(o => o.temperature);
          this.lineBigDashboardChartLabels = this.sortedData.map(o => o.name);
        }
        
      });

    });

    
    this._chart.refresh()


  }

  deleteCity(city: City) {

    console.log("tocaste me", city.name)

    this.sortedData = this.sortedData.filter(obj => obj !== city);
    this.lineBigDashboardChartData[0].data = this.sortedData.map(o => o.temperature);
    this.lineBigDashboardChartLabels = this.sortedData.map(o => o.name);
  }

  onKey(event) {
    this.inputValue = event.target.value;


    console.log(this.inputValue)
  }
  sortData(id: string) {

    const data = this.sortedData.slice();

    if (!id) {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      //const isAsc = sort.direction === 'asc';
      const isAsc = true;
      switch (id) {
        case 'cityname': return compare(a.name, b.name, isAsc);
        case 'temperature': return compare(a.temperature, b.temperature, isAsc);
        case 'sunrise': return compare(a.sunrise, b.sunrise, isAsc);
        case 'sunset': return compare(a.sunset, b.sunset, isAsc);
        default: return 0;
      }
    });


  }





  getCities() {

    this.cityService.getCities(["Viseu", "Lisboa", "Porto", "Madrid", "Paris", "Mangualde"]).subscribe((data: any) => {

      //this.city = city;

      //chartData.push(data[i].temperature);
      //chartLabels.push(data[i].name)
      for (let i = 0; i < data.length; i++) {

        let sunrise = new Date(parseInt(data[i].sunrise) * 1000);
        data[i].sunrise = addZero(sunrise.getHours()).toString() + ':' + addZero(sunrise.getMinutes()).toString();
        let sunset = new Date(parseInt(data[i].sunset) * 1000);
        data[i].sunset = addZero(sunset.getHours()).toString() + ':' + addZero(sunset.getMinutes()).toString();

      }
      this.cities = data;
      this.sortedData = data.slice();
      this.dataTable = data.slice();
      this.displayedColumns = ['City', 'Temperature', 'Sunrise', 'Sunset'];

      console.log("this.cities", this.cities)
      this.lineBigDashboardChartData = [
        {
          label: "Data",

          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,

          borderWidth: 2,
          data: this.sortedData.map(o => o.temperature)
        }
      ];

      this.lineBigDashboardChartLabels = this.sortedData.map(o => o.name)

      this.renderChartBar()
    });

  }
  public renderChartBar() {


    this.chartColor = "#33FFE3";
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");


    this.lineBigDashboardChartColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBorderColor: this.chartColor,
        pointBackgroundColor: "#2c2c2c",
        pointHoverBackgroundColor: "#2c2c2c",
        pointHoverBorderColor: this.chartColor,
      }
    ];

    this.lineBigDashboardChartOptions = {

      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      legend: {
        position: "bottom",
        fillStyle: "#FFF",
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10
          },
          gridLines: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent"
          }

        }],
        xAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            display: false,

          },
          ticks: {
            padding: 10,
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold"
          }
        }]
      }
    };

    this.lineBigDashboardChartType = 'bar';

  }

  ngOnInit() {

    /* this.directions = {
      name: '',
      temperature: '',
      sunset: '',
      sunri se: ''
    }*/
    this.getCities();


  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
