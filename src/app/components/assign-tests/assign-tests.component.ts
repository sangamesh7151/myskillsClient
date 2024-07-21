import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestViewModel } from '../../models/tests/test.model';
import { userToAssignTest } from '../../models/user/user.model';


@Component({
  selector: 'app-assign-tests',
  templateUrl: './assign-tests.component.html',
  styleUrls: ['./assign-tests.component.scss']
})
export class AssignTestsComponent {
  @Input() availableStudents: userToAssignTest[] = [];
  @Input() assignedStudents: userToAssignTest[] = [];
  @Input() test: TestViewModel;
  @Output() updateAssignedStudents = new EventEmitter<userToAssignTest[]>();

 
  selectedAvailable: userToAssignTest[] = [];
  selectedAssigned: userToAssignTest[] = [];

  assignSelected() {
    this.assignedStudents = [...this.assignedStudents, ...this.selectedAvailable];
    this.availableStudents = this.availableStudents.filter(user => !this.selectedAvailable.includes(user));
    this.selectedAvailable = [];
    this.updateAssignedStudents.emit(this.assignedStudents);
  }

  removeSelected() {
    this.availableStudents = [...this.availableStudents, ...this.selectedAssigned];
    this.assignedStudents = this.assignedStudents.filter(user => !this.selectedAssigned.includes(user));
    this.selectedAssigned = [];
    this.updateAssignedStudents.emit(this.assignedStudents);
  }

  // Function to handle "Add All"
  assignAll() {
    this.assignedStudents = [...this.assignedStudents, ...this.availableStudents];
    this.availableStudents = [];
    this.updateAssignedStudents.emit(this.assignedStudents);
  }

  // Function to handle "Remove All"
  removeAll() {
    this.availableStudents = [...this.availableStudents, ...this.assignedStudents];
    this.assignedStudents = [];
    this.updateAssignedStudents.emit(this.assignedStudents);
  }
}
