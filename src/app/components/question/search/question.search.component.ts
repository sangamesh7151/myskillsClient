import { Component, EventEmitter, Output } from '@angular/core';
import { ReferenceDataViewModel } from '../../../models/ReferenceModel/reference.model';
import { FilterRule, SearchCriteria } from '../../../models/Search/search-criteria.model';
import { QuestionService } from '../../../services/question/question.service';
import { ReferenceDataService } from '../../../services/Reference/reference-data.service';

@Component({
  selector: 'app-question-search',
  templateUrl: './question.search.component.html',
  styleUrls: ['./question.search.component.scss']
})
export class QuestionSearchComponent {
  grades: ReferenceDataViewModel[] = [];
  subjects: ReferenceDataViewModel[] = [];
  topics: ReferenceDataViewModel[] = [];
  difficultyLevels: ReferenceDataViewModel[] = [];
  questionTypes: ReferenceDataViewModel[] = [];
  isActive = true;
  // Predefined criteria and operations for the filter rules
  criteria = ['text', 'type', 'difficulty', 'feedback', 'gradeId', 'subjectId', 'topicId'];
  operations = ['like', 'equals', 'notEquals', 'lessThanEqual', 'greaterThanEqual'];
  searchCriteria
  // Initializing the filter rules array
  filterRules: FilterRule[] = [{
    field: '',
    operation: '',
    value: '',
    availableOperations: this.operations
  }];

  @Output() searchEvent = new EventEmitter<any>();

  constructor(private questionService: QuestionService, private referenceDataService: ReferenceDataService) { }

  addRule() {
    this.filterRules.push({ field: '', operation: '', value: '', availableOperations: [] });
  }

  ngOnInit() {
    this.loadQuestionTypes();
    this.loadDifficultyLevels();
    this.loadGrades();
  }

  loadGrades(): void {
    this.referenceDataService.getGrades()
      .subscribe(grades => {
        console.log("grade" + grades);
        this.grades = grades;
        // You can now work with the 'grades' array in your component
      });
  }

  loadQuestionTypes() {
    this.referenceDataService.getQuestionTypes().subscribe(
      questionTypes => {
        this.questionTypes = questionTypes;
      },
      error => console.error(error)
    );
  }

  loadDifficultyLevels() {
    this.referenceDataService.getDifficultyLevels().subscribe(
      difficultyLevels => {
        this.difficultyLevels = difficultyLevels;
      },
      error => console.error(error)
    );
  }
  // Inside QuestionSearchComponent

  onCriteriaChange(rule: FilterRule, index: number) {
    // If user selects a subject but hasn't selected a grade
    if (rule.field === 'subjectId') {
      const gradeRule = this.filterRules.find(r => r.field === 'gradeId');
      if (!gradeRule || !gradeRule.value) {
        window.alert('Please select the grade first.');
        this.removeRule(index); // Remove the current rule
        return; // Exit the method
      }

      // Proceed to load subjects as before
      this.referenceDataService.getSubjects(gradeRule.value).subscribe(
        subjects => {
          this.subjects = subjects;
          // Additional logic as before
        },
        error => console.error(error)
      );
    }
    // If user selects a topic but hasn't selected a subject
    else if (rule.field === 'topicId') {
      const subjectRule = this.filterRules.find(r => r.field === 'subjectId');
      if (!subjectRule || !subjectRule.value) {
        window.alert('Please select the subject first.');
        this.removeRule(index); // Remove the current rule
        return; // Exit the method
      }

      // Proceed to load topics as before
      this.referenceDataService.getTopics(subjectRule.value).subscribe(
        topics => {
          this.topics = topics;
          // Additional logic as before
        },
        error => console.error(error)
      );
    }
    // Additional conditions for other fields as before
  }



  removeRule(index: number) {
    this.filterRules.splice(index, 1);
  }

  search() {

    const searchCriteria: SearchCriteria = {
      isActive: this.isActive,
      filterRules: this.filterRules,
    };

    console.log(searchCriteria);
    this.questionService.searchQuestions(searchCriteria)
      .subscribe(
        data => this.searchEvent.emit(data),
        error => console.error(error)

      );
    // You would call your service here
    //console.log(searchCriteria);
    //this.searchEvent.emit(searchCriteria);
  }
}
