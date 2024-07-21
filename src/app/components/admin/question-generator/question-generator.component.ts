import { Component, OnInit } from '@angular/core';
import { QuestionRequest } from '../../../models/admin/QuestionRequest';
import { QuestionViewModel } from '../../../models/question/question.model';
import { ChatGpt } from '../../../services/chatgpt/chat-gpt.service'
import { ReferenceDataService } from '../../../services/Reference/reference-data.service';

@Component({
  selector: 'app-question-generator',
  templateUrl: './question-generator.component.html',
  styleUrls: ['./question-generator.component.scss']
})
export class QuestionGeneratorComponent implements OnInit {

  model: QuestionRequest = new QuestionRequest();
  grades: any[] = [];
  subjects: any[] = [];
  topics: any[] = [];
  difficultyLevels: any[] = [];
  questionTypes: any[] = [];
  showModal = false;  

  constructor(
    private referenceDataService: ReferenceDataService,
    private chatGptService: ChatGpt  // Inject the ChatGPT service
  ) { }

  ngOnInit(): void {
    this.getGrades();
    this.getDifficultyLevels();
    this.getQuestionTypes();
  }

  getGrades(): void {
    this.referenceDataService.getGrades()
      .subscribe(grades => {
        this.grades = grades;
      }, error => {
        console.error('Failed to load grades:', error);
      });
  }

  getDifficultyLevels(): void {
    this.referenceDataService.getDifficultyLevels()
      .subscribe(levels => {
        this.difficultyLevels = levels;
      }, error => {
        console.error('Failed to load difficulty levels:', error);
      });
  }

  getQuestionTypes(): void {
    this.referenceDataService.getQuestionTypes()
      .subscribe(types => {
        this.questionTypes = types;
      }, error => {
        console.error('Failed to load question types:', error);
      });
  }

  onGradeChange(gradeId): void {
    this.referenceDataService.getSubjects(gradeId)
      .subscribe(subjects => {
        this.subjects = subjects;
        this.model.subjectId = undefined;
        this.model.topicId = undefined;
      }, error => {
        console.error('Failed to load subjects:', error);
      });
  }

  onSubjectChange(subjectId): void {
    this.referenceDataService.getTopics(subjectId)
      .subscribe(topics => {
        this.topics = topics;
        this.model.topicId = undefined;
      }, error => {
        console.error('Failed to load topics:', error);
      });
  }

  generateQuestions(): void {
    // Ensure all necessary model values are set
    console.log(this.model);
    if (this.model.gradeId && this.model.subjectId && this.model.topicId && this.model.difficultyLevel) {
      this.chatGptService.generateQuestions(this.model).subscribe({
        next: (response) => {
          console.log('Questions generated:', response);
          this.showSuccessModal();
        },
        error: (error) => {
          console.error('Error generating questions:', error);
        }
      });
    } else {
      console.error('Please ensure all fields are selected before generating questions.');
    }
  }

  showSuccessModal(): void {
    this.showModal = true;  // Show the modal
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
    if (!this.showModal) {
      this.resetModel();  // Reset the model when modal is closed
    }
  }

  resetModel(): void {
    this.model = new QuestionRequest();  // Reset the model to initial state
  }
}
