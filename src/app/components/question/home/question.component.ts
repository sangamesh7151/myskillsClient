import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DifficultyLevel, OptionViewModel, QuestionViewModel } from '../../../models/question/question.model';
import { ReferenceDataViewModel } from '../../../models/ReferenceModel/reference.model';
import { QuestionService } from '../../../services/question/question.service';
import { ReferenceDataService } from '../../../services/Reference/reference-data.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionUpdateRequest } from '../../../models/Question/question.update.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public autocompleteItemsAsObjects = [
    { name: 'Item1', id: 0 },
    { name: 'item2', id: 1 }

  ];
  questions: any[] = [];
  questionModel: QuestionViewModel;
  updateQuestionModel: QuestionUpdateRequest;
  topics: ReferenceDataViewModel[] = [];
  difficultyLevels: ReferenceDataViewModel[] = [];
  questionTypes: ReferenceDataViewModel[] = [];
  public editorConfig = ClassicEditor;
  public Editor = ClassicEditor;
  questionForm: FormGroup;
  modifiedQuestionData: QuestionViewModel = new QuestionViewModel();
  originalQuestionData: QuestionViewModel;
  model: QuestionViewModel = new QuestionViewModel();
  classId: string = '';
  subjectId: string = '';
  selectedSubjectId: number;
  selectedTopicId: number;
  selectedQuestionTypeId: number;
  selectedDifficultyLevel: ReferenceDataViewModel;
  grades: ReferenceDataViewModel[] = [];
  subjects: ReferenceDataViewModel[] = [];

  //Search:
  showAdvancedSearch: boolean = true;
  matchCriteria: string = 'all';
  filterRules: any[] = [
    { field: 'address', operation: 'contains', value: '' }
  ];
  dateSelection: string = 'customDate';
  startDate: string;
  endDate: string;




  constructor(private questionService: QuestionService, private referenceDataService: ReferenceDataService) { }

  ngOnInit(): void {
    this.getGrades();
  }

  addRule() {
    this.filterRules.push({ field: '', operation: '', value: '' });
  }

  removeRule(index: number) {
    this.filterRules.splice(index, 1);
  }

  applyFilter() {
    // Implement filter application logic
  }

  search() {
    this.questionService.searchQuestions(this.classId)
      .subscribe(
        data => this.questions = data,
        error => console.error(error)
      );
  }

  handleSearch(data) {
    this.questions = data;
    // Perform actions with the search criteria, such as displaying results
  }


  onGradeChange(selectedGrade): void {
    console.log("selectedGrade is" + selectedGrade)
    this.referenceDataService.getSubjects(selectedGrade)
      .subscribe(subjects => {
        this.subjects = subjects;
        // You can now work with the 'grades' array in your component
      });
  }

  getGrades(): void {
    this.referenceDataService.getGrades()
      .subscribe(grades => {
        console.log("grade" + grades);
        this.grades = grades;
        // You can now work with the 'grades' array in your component
      });
  }

  viewQuestion(id: number) {
    // Implement viewing logic here
    console.log(`Viewing question ${id}`);
    //this.questionService.getQuestionById(id)
    //  .subscribe(
    //    data => this.modifiedQuestionData = data,
    //    error => console.error(error)
    //);

    this.questionService.getQuestionById(id)
      .subscribe({
        next: (data) => {
          this.modifiedQuestionData = data;
          this.originalQuestionData = data;
          // Now that you have the question data, fetch related subjects
          this.fetchSubjectsForGrade(data.gradeId);
        },
        error: (error) => console.error(error)
      });

  }

  fetchSubjectsForGrade(selectedGrade: number) {
    this.referenceDataService.getSubjects(selectedGrade)
      .subscribe({
        next: (subjects) => {
          this.subjects = subjects;
          // After setting the subjects, pre-select the subject based on question data
          this.preSelectSubject(this.modifiedQuestionData.subjectId);
        },
        error: (error) => console.error(error)
      });
  }

  highlightCard(event, status) {
    event = status;
  }

  getDifficultyText(level: number): string {
    return DifficultyLevel[level];
  }



  onTopicChange(selectedsubject): void {
    this.referenceDataService.getTopics(selectedsubject)
      .subscribe(topics => {
        this.topics = topics;
        // You can now work with the 'grades' array in your component
      });
  }

  getDificultylevels() {

    this.referenceDataService.getDifficultyLevels()
      .subscribe(difficultyLevels => {
        console.log("grade" + difficultyLevels);
        this.difficultyLevels = difficultyLevels;
        // You can now work with the 'grades' array in your component
      });
    //this.dificultylevels = Object.keys(DifficultyLevel).map(key => ({
    //  key: DifficultyLevel[key],
    //  value: key
    //}));
  }

  fetchTopicsFromSubject(selectedSubject: number) {
    this.referenceDataService.getTopics(selectedSubject)
      .subscribe({
        next: (topics) => {
          this.topics = topics;
          // Optionally, pre-select a topic if needed
          this.preSelectTopic(this.modifiedQuestionData.topicId);
        },
        error: (error) => console.error('Error fetching topics:', error)
      });
  }

  preSelectSubject(subjectId: number) {
    // Assuming 'subjects' is an array of subject objects { id: number, name: string }
    // And your ng-select for subjects uses 'id' for the value ([bindValue]="id")
    if (this.subjects && this.subjects.length > 0) {
      // Find the subject in the array
      const selectedSubject = this.subjects.find(subject => subject.key === subjectId);
      // Assuming ngModel is used for binding the selected subject in your ng-select
      this.selectedSubjectId = selectedSubject ? selectedSubject.key : null;
      this.fetchTopicsFromSubject(this.selectedSubjectId)
    }
  }

  preSelectTopic(topicId: number) {
    if (this.topics && this.topics.length > 0) {
      // Assuming 'topics' is an array of topic objects { id: number, name: string }
      // And your ng-select for topics uses 'id' for the value ([bindValue]="id")
      const selectedTopic = this.topics.find(topic => topic.key === topicId);
      // Assuming ngModel is used for binding the selected topic in your ng-select
      this.selectedTopicId = selectedTopic ? selectedTopic.key : null;
      this.getDifficultyLevels();
    }
  }

  getDifficultyLevels() {
    this.referenceDataService.getDifficultyLevels()
      .subscribe({
        next: (difficultyLevels) => {
          console.log("Difficulty Levels: ", difficultyLevels);
          this.difficultyLevels = difficultyLevels;
          // Optionally, pre-select a difficulty level if `modifiedQuestionData` is already set
          if (this.modifiedQuestionData && this.modifiedQuestionData.difficulty) {
            this.preSelectDifficultyLevel(this.modifiedQuestionData.difficulty);
          }
        },
        error: (error) => console.error('Error fetching difficulty levels:', error)
      });
  }

  preSelectDifficultyLevel(difficultyKey: string | number) {
    // Assuming `difficultyLevels` is an array of objects { key: string, value: string }
    // And your ng-select or form control uses 'key' as the value
    this.selectedDifficultyLevel = this.difficultyLevels.find(level => level.key === difficultyKey);
    this.getQuestionTypes();
    // If using ngModel or similar bindings, you would set `selectedDifficultyLevelKey` to the key
    // If using Reactive Forms, you might set the form control value directly
    // this.questionForm.get('difficulty').setValue(this.selectedDifficultyLevel.key);
  }

  getQuestionTypes(): void {
    this.referenceDataService.getQuestionTypes()
      .subscribe({
        next: (questionTypes) => {
          console.log("Question Types: ", questionTypes);
          this.questionTypes = questionTypes;
          // Optionally, pre-select a question type if `modifiedQuestionData` is already set
          if (this.modifiedQuestionData && this.modifiedQuestionData.typeId) {
            this.preSelectQuestionType(this.modifiedQuestionData.typeId);
          }
        },
        error: (error) => console.error('Error fetching question types:', error)
      });
  }

  preSelectQuestionType(typeId: number) {
    // Assuming `questionTypes` is an array of objects { id: number, name: string }
    // And your ng-select or form control uses 'id' as the value
    this.selectedQuestionTypeId = this.questionTypes.find(type => type.key === typeId)?.key;
    // If using ngModel or similar bindings, you would set `selectedQuestionTypeId` directly
    // If using Reactive Forms, you might set the form control value directly
    // this.questionForm.get('typeId').setValue(this.selectedQuestionTypeId);
  }

  handleOptionsChange(updatedOptions: OptionViewModel[]) {
    console.log(updatedOptions);
    console.log(this.modifiedQuestionData);
    this.modifiedQuestionData.options = updatedOptions;
    // Here, you can also perform additional actions, such as updating the backend with the new options list
  }

  hasChanges(original: QuestionViewModel, modified: QuestionViewModel): boolean {
    // Example comparison, extend this to thoroughly compare relevant fields
    // return original.text !== modified.text;
    return true;
  }

  update():void {

    if (this.hasChanges(this.originalQuestionData, this.modifiedQuestionData)) {
      const updateRequest: QuestionUpdateRequest = {
        original: this.originalQuestionData,
        modified: this.modifiedQuestionData
      };
      
      console.log(this.modifiedQuestionData);
      // Assuming you have an updateQuestion method in your service
      this.questionService.updateQuestion(this.modifiedQuestionData)
        .subscribe({
          next: () => console.log('Question updated successfully'),
          error: (error) => console.error('Error updating question', error)
        });
    } else {
      console.log('No changes detected');
    }
  }

}
