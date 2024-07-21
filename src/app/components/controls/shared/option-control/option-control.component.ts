import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionViewModel } from '../../../../models/Question/question.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-option-control',
  templateUrl: './option-control.component.html',
  styleUrls: ['./option-control.component.scss']
})
export class OptionControlComponent {

  @Input() options: OptionViewModel[] = []; // Accept options from the parent
  @Output() optionsChange = new EventEmitter<OptionViewModel[]>(); // Notify changes to the parent

  public editor = ClassicEditor;
  newOptionText: string = "";
  newOptionIsCorrect: boolean = false;
  public isEditorReadOnly: boolean = true;

  constructor() { }

  addOption() {
    const newOption = {
      id: this.generateUniqueId(), // Ensure this id is unique in the context of the options list
      optionText: this.newOptionText,
      isCorrect: this.newOptionIsCorrect,
      selected: false,
      isEditing: false // Assuming OptionViewModel has an isEditing property
    };
    this.options.push(newOption);
    this.optionsChange.emit(this.options); // Emit the change
    this.newOptionText = '';
    this.newOptionIsCorrect = false;
  }

  deleteOption(optionId: number) {
    this.options = this.options.filter(option => option.id !== optionId);
    this.optionsChange.emit(this.options); // Emit the change
  }

  startEdit(option: OptionViewModel) {
    option.isEditing = true;
  }

  saveEdit(option: OptionViewModel, editedText: string) {
    option.optionText = editedText;
    option.isEditing = false;
    this.optionsChange.emit(this.options); // Emit the change
  }

  cancelEdit(option: OptionViewModel) {
    option.isEditing = false;
  }

  generateUniqueId(): number {
    return -1;
    // Assuming this method ensures a unique ID within the options; consider a more robust method if necessary
    return Date.now(); // Simplistic approach for generating unique IDs
  }
}
