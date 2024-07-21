import { Component, OnInit,Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionViewModel } from '../../../../models/question/question.model';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnInit {

  public Editor = ClassicEditor;
  @Input() questionViewModels: QuestionViewModel[]; 
  constructor() { }

  ngOnInit(): void {
  }

}
