import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartOptions, Color } from 'chart.js';
export interface Child {
  name: string;
  grade: string;
  totalTestsTaken: number;
  upcomingTests: number;
  recommendations: string[];
}

export interface SubjectPerformance {
  subject: string;
  happiness: number;
  confusion: number;
  relevance: number;
}

@Component({
  selector: 'app-performance-summary',
  templateUrl: './performance-summary.component.html',
  styleUrls: ['./performance-summary.component.scss']
})
export class PerformanceSummaryComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('performanceTrendChart') performanceTrendChart!: ElementRef<HTMLCanvasElement>;
  childInfo: Child = {
    name: 'John Doe',
    grade: '5th Grade',
    totalTestsTaken: 12,
    upcomingTests: 3,
    recommendations: [
      'Focus more on Mathematics topics like Algebra.',
      'Practice more Science quizzes on Biology.'
    ]
  };

  subjectPerformances: SubjectPerformance[] = [
    { subject: 'Mathematics', happiness: 80, confusion: 20, relevance: 75 },
    { subject: 'Science', happiness: 70, confusion: 30, relevance: 85 }
  ];

  

  childName = 'John Doe'; // Child's name displayed to the parent
  averageTestScore = 85; // Example average test score
  bestPerformance = 95; // Best test score
  worstPerformance = 70; // Worst test score
  timerReference: any;
  subjectScores = {
    math: 80,
    science: 90,
    english: 85
  };

  improvementSuggestion = 'Focus more on math practice tests to improve performance.'; // Example suggestion for improvement

  chart: any; // Chart instance for performance trends

  constructor() { }

  ngOnInit(): void {
    this.initPerformanceTrendChart(); // Initialize the chart when the component loads
  }

  ngOnDestroy() {
    clearInterval(this.timerReference);
  }

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  initializeChart(): void {
    this.chart = new Chart(this.performanceTrendChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4'],
        datasets: [{
          label: 'Performance Trend',
          data: [75, 85, 80, 90],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  

  // Initialize the performance trend chart (e.g., with Chart.js)
  initPerformanceTrendChart() {
    this.chart = new Chart('performanceTrendChart', {
      type: 'line', // Example chart type
      data: {
        labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4'], // X-axis labels
        datasets: [
          {
            label: 'Performance Trend',
            data: [75, 85, 80, 90], // Example data for the trend
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
