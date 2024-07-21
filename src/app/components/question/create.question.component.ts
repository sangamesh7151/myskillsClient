import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DifficultyLevel,
  ExplanationViewModel,
  FileUploadeViewModel,
  QuestionTypeId,
  QuestionViewModel,
  TagViewModel,
} from '../../models/question/question.model';
import { QuestionService } from '../../services/question/question.service'
import { OptionControlComponent } from '../../components/controls/shared/option-control/option-control.component';
import { ReferenceDataService } from '../../services/Reference/reference-data.service';
import { ReferenceDataViewModel } from '../../models/ReferenceModel/reference.model';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
/*import * as CKEDITOR from '../../../../../../../assets/scripts/ckeditor5-build-classic/ckeditor.js';*/

//import { Subject } from './subject';
//import { Topic } from './topic';
//import { Tag } from './tag';
//import { DifficultyLevel } from './difficulty-level';

@Component({
  selector: 'app-question-form',
  templateUrl: './create.question.component.html',
  styleUrls: ['./create.question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  @ViewChild(OptionControlComponent) child!: OptionControlComponent;
  questionForm: FormGroup;
  model: QuestionViewModel = new QuestionViewModel();
  public QuestionTypeId: QuestionTypeId | null;
  /* difficultyLevels = Object.values(DifficultyLevel);*/
  options: { text: string, selected: boolean }[] = [];
  grades: ReferenceDataViewModel[] = [];
  subjects: ReferenceDataViewModel[] = [];
  topics: ReferenceDataViewModel[] = [];
  dificultylevels: ReferenceDataViewModel[] = [];
  questionTypes: ReferenceDataViewModel[] = [];
  selectedQuestionTypeId: string = ''
  selectedGrade: string;
  selectedSubject: string;
  selectedTopicId: string = '';
  selectedType: string;
  selectedDificultylevelId: string = ''
  selectedWeightage: number;
  public editorConfig = ClassicEditor;
  selectedSearchPersonId: string = '';
  selectedSubjectId: string = ''
  itemsWithMaxLimit : TagViewModel[]=[];
  public Editor = ClassicEditor;
  public editorData = '';
  public optionArray = []
  public autocompleteItemsAsObjects = [
    { name: 'Item1', id: 0 },
    { name: 'item2', id: 1 }
  
  ];

  constructor(private referenceDataService: ReferenceDataService, private questionService: QuestionService, private formBuilder: FormBuilder) {

    //this.questionForm = this.formBuilder.group({
    //  gradeId: ['', Validators.required],
    //  subjectId: ['', Validators.required],
    //  topicId: ['', Validators.required],
    //  questionTypeId: ['', Validators.required],
    //  questionText: ['', Validators.required],
    //  weightage: ['', Validators.required],
    //  difficultyLevelId: ['', Validators.required]


    //});


    //this.questionForm = this.formBuilder.group({
    //  gradeId: [null],
    //  subjectId: [null],
    //  topicId: [null],
    //  // Define other form controls to match your model
    //});
    //const initialModel = new QuestionViewModel();
    //this.questionForm = this.formBuilder.group(initialModel);
  }

  ngOnInit(): void {
    this.getGrades();
    this.getDificultylevels();
    this.getQuestionTypes();
    //optionArray: this.formBuilder.array([]);

  }

  viewQuestion(id: number) {
    // Implement viewing logic here
    console.log(`Viewing question ${id}`);
  }

  addTag() {
    if (this.itemsWithMaxLimit) {
      const tag = new TagViewModel();
      tag.id = this.model.tags.length + 1;
      tag.name = 'New Tag';
      this.model.tags.push(tag);
    }
  }

  //onTagAdded(strtag: TagViewModel) {
  //  const tag = new TagViewModel();
  //  tag.id = this.model.tags.length + 1;
  //  tag.name = strtag;
  //  this.model.tags.push(tag);
  //}

  //onTagRemoved(strtag: string) {
  //  console.log(strtag.toString());
  //  const index = this.model.tags.findIndex(tag => tag.name.match(strtag));
  //  if (index !== -1) {
  //    this.model.tags.splice(index, 1);
  //  }
  //}

  getGrades(): void {
    this.referenceDataService.getGrades()
      .subscribe(grades => {
        console.log("grade" + grades);
        this.grades = grades;
        // You can now work with the 'grades' array in your component
      });
  }
  getQuestionTypes(): void {
    this.referenceDataService.getQuestionTypes()
      .subscribe(questionTypes => {
        console.log("grade" + questionTypes);
        this.questionTypes = questionTypes;
        // You can now work with the 'grades' array in your component
      });
  }
  getDificultylevels() {

    this.referenceDataService.getDifficultyLevels()
      .subscribe(difficultyLevels => {
        console.log("grade" + difficultyLevels);
        this.dificultylevels = difficultyLevels;
        // You can now work with the 'grades' array in your component
      });
    //this.dificultylevels = Object.keys(DifficultyLevel).map(key => ({
    //  key: DifficultyLevel[key],
    //  value: key
    //}));
  }

  onGradeChange(selectedGrade): void {
    console.log("selectedGrade is" + selectedGrade)
    this.referenceDataService.getSubjects(selectedGrade)
      .subscribe(subjects => {
        this.subjects = subjects;
        // You can now work with the 'grades' array in your component
      });
  }

  onTopicChange(selectedsubject): void {
    this.referenceDataService.getTopics(selectedsubject)
      .subscribe(topics => {
        this.topics = topics;
        // You can now work with the 'grades' array in your component
      });
  }


  addExplanation() {
    //const explanation = new ExplanationViewModel();
    //explanation.text = 'New Explanation';
    // this.model.explanations.push(explanation);
  }

  setDifficulty(difficulty: DifficultyLevel) {
    this.model.difficulty= difficulty;
  }

  addOption() {
    // const optionGroup = this.formBuilder.group({
    //   id: [''], // You may generate a unique ID here if needed
    //   optionText: ['', Validators.required],
    //   isCorrect: [false],
    // });

    // this.optionArray.push(optionGroup);
  }

  uploadVideoFiles(event) {
    const files = event.target.files;
    for (const file of files) {
      const fileModel = new FileUploadeViewModel();
      fileModel.id = file.name;
      fileModel.name = file.name;
      //this.model.videoFiles.push(fileModel);
    }
  }

  uploadTextFiles(event) {
    const files = event.target.files;
    for (const file of files) {
      const fileModel = new FileUploadeViewModel();
      fileModel.id = file.name;
      fileModel.name = file.name;
     // this.model.textFiles.push(fileModel);
    }
  }


  submit() {
    /*if (this.questionForm.invalid) {*/
    console.log("Hellow");
    //this.child.options
    this.model.options = this.child.options;
    //Add Tags
   // const formData = this.questionForm.value;
    console.log(this.model);
    this.questionService.createQuestion(this.model).subscribe(option => { });

  
   /* }*/
    // send the model to the server or save it to the database
  }

  //private saveSuccessHelper() {
  //  this.alertService.stopLoadingMessage();
  //  this.alertService.showMessage(this.gT('register.alerts.Success'), this.gT('register.alerts.UserCreatedSuccessfully', { username: this.userEdit.userName }), MessageSeverity.success);

  //  this.login();
  //}


  //private saveFailedHelper(error: any) {
  //  this.isLoading = false;
  //  this.alertService.stopLoadingMessage();
  //  this.alertService.showStickyMessage(this.gT('register.alerts.SaveError'), this.gT('register.alerts.BelowRegistrationErrorsOccured'), MessageSeverity.error, error);
  //  this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  //}

  onTagEdited(item: any) {
    console.log('tag edited: current value is ' + item);
  }
}

