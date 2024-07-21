// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

//export class QuestionViewModel {
//  public gradeId: number;
//  public subjectId: number;
//  public topicId: number;
//  public tags: TagViewModel[]=[];
//  public questionTypeId: number | null;
//  public imageId: string | null;
//  public videoId: string | null;
//  public questionText: string='';
//  public explanation: string='';
//  public weightage: string;
//  public feedBack: string;
//  public difficultyLevelId: string;
//  public videoFiles: FileUploadeViewModel[];
//  public textFiles: FileUploadeViewModel[];
//  public options: OptionViewModel[];
//}

export class QuestionViewModel {
  id: number;
  text: string = '';
  typeId: number;
  difficulty: DifficultyLevel;
  weightage: number;
  feedBack: string = '';
  isActive: boolean = false;
  otherDetails: string = '';
  explanation: string = '';

  gradeId: number;
  subjectId: number;
  topicId: number;

  options: OptionViewModel[] = [];
  tags: TagViewModel[] = [];
}

export class TagViewModel {
  public id: number;
  public name: string;
}

export class ExplanationViewModel {
  public text: string;
}

export enum DifficultyLevel {
  easy = 1,
  moderate = 2,
  difficult = 3
}

export class FileUploadeViewModel {
  public id: string;
  public name: string;
  public fileId: string;
  public url: string;
  public fileName: string;
}

export class OptionViewModel {
  public id: number;
  public optionText: string;
  public isCorrect: boolean;
  public isEditing: boolean; // New property to track editing state
  public selected: boolean;

  constructor(id: number, optionText: string, isCorrect: boolean) {
    this.id = id;
    this.optionText = optionText;
    this.isCorrect = isCorrect;
    this.isEditing = false; // Initialize as not editing
    this.selected = false;
  }
}


export enum QuestionTypeId {
  multipleChoice = 1,
  singleAnswer = 2,
  trueOrFalse = 3
}


