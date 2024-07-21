export interface TestAssignmentViewModel {
  id?: number;
  assignedByUserId?: string; // Updated from parentUserId
  assignedToUserIds: string[]; // This remains an array to accommodate multiple assigned users
  assignedByUserName?: string; // Assuming you might want the name of the user who assigned the test
  assignedToUserNames?: string[]; // This could be an array of names corresponding to assignedToUserIds
  testId: number;
  assignmentDate?: Date;
  completionDate?: Date;
  isCompleted?: boolean;
}
