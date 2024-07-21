import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertService, DialogType, MessageSeverity } from '../../../../services/alert.service';
import { BaseChartDirective } from 'ng2-charts';
import { AuthService } from '../../../../services/auth.service';
import { TestReportServiceService } from '../../../../services/testReport/test-report.service.service';
import { ChartData, ChartDataset } from '../../../../models/report/chartData.model';

require('chart.js');

@Component({
  selector: 'app-test-statistics',
  templateUrl: './test-statistics.component.html',
  styleUrls: ['./test-statistics.component.scss']
})


export class TestStatisticsComponent implements OnInit, OnDestroy {

  chartOptions;
  chartType = 'bar';
  chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  chartData = [
    {
      data: [65, 59, 80, 81, 56, 55],
      label: 'Series A',
      fill: 'origin',

    },
    {
      data: [28, 48, 40, 19, 86, 27],
      label: 'Series B',
      fill: 'origin',

    },
    {
      data: [18, 48, 77, 9, 100, 27],
      label: 'Series C',
      fill: 'origin',
      /*
      // darker grey color
      backgroundColor: 'rgba(128,128,128,0.2)',
      borderColor: 'rgba(128,128,128,1)',
      pointBackgroundColor: 'rgba(128,128,128,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(128,128,128,0.8)'
      */
    }
  ];

  timerReference: any;


  @ViewChild(BaseChartDirective)
  chart?: BaseChartDirective;

  constructor(private authService: AuthService, private testReportServiceService: TestReportServiceService, private alertService: AlertService) {

  }

  ngOnInit() {
    console.log('on log');
    console.log(this.authService.currentUser?.id);
    this.loadTestStatistics(this.authService.currentUser?.id);
    // this.refreshChartOptions();
    // this.timerReference = setInterval(() => this.randomize(), 5000);
  }

  loadTestStatistics(parentId: string): void {
    this.testReportServiceService.getTestStatisticsForParent(parentId).subscribe({
      next: (data) => {
        // Reset chartData for each new set of data
        this.chartData = [];

        // Dynamically process and assign datasets
        data.chartDatasets.forEach((dataset: ChartDataset) => {
          this.chartData.push({
            data: dataset.data,
            label: dataset.label,
            fill: 'origin',
            // Include other properties as needed, depending on your chart library
          });
        });

        // Optionally, if your chart library supports it, update chart labels dynamically
        this.chartLabels = data.chartLabels;
        this.chartType = 'bar'
      },
      error: (error) => console.error(error)
    });
  }



  ngOnDestroy() {
    clearInterval(this.timerReference);
  }

  refreshChartOptions() {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
        fontSize: 16,
        text: 'Test Info'
      },
      scales: {
        y: {
          min: 0,        // Start from zero
          ticks: {
            stepSize: 1  // Increment by 1
          }
        }
      }
    }
    this.loadTestStatistics(this.authService.currentUser?.id);

    //if (this.chartType != 'line') {
    //  this.chartOptions = baseOptions;
    //}
    //else {
    //  const lineChartOptions = {
    //    elements: {
    //      line: {
    //        tension: 0.5
    //      }
    //    }
    //  }

    //  this.chartOptions = { ...baseOptions, ...lineChartOptions };
    //}
  }

  randomize(): void {
    this.loadTestStatistics(this.authService.currentUser?.id);
  }

  changeChartType(type: string) {
    this.chartType = type;
    this.refreshChartOptions();
  }

  showMessage(msg: string): void {
    this.alertService.showMessage('Demo', msg, MessageSeverity.info);
  }

  showDialog(msg: string): void {
    this.alertService.showDialog(msg, DialogType.prompt, (val) => this.configure(true, val), () => this.configure(false));
  }

  configure(response: boolean, value?: string) {

    if (response) {

      this.alertService.showStickyMessage('Simulating...', '', MessageSeverity.wait);

      setTimeout(() => {

        this.alertService.resetStickyMessage();
        this.alertService.showMessage('Demo', `Your settings was successfully configured to \"${value}\"`, MessageSeverity.success);
      }, 2000);
    } else {
      this.alertService.showMessage('Demo', 'Operation cancelled by user', MessageSeverity.default);
    }
  }

  chartClicked(e): void {
    //console.log(e);
  }

  chartHovered(e): void {
    //console.log(e);
  }
}
