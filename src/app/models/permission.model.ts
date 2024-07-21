// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

//export type PermissionNames =
//    'View Users' | 'Manage Users' |
//    'View Roles' | 'Manage Roles' | 'Assign Roles';

export type PermissionNames =
  'View Users' | 'Manage Users' |
  'View Roles' | 'Manage Roles' | 'Assign Roles' |
  'Take Test' | 'View Test Results' | 'Create Test' | 'View Test' | 'Edit Test' | 'Delete Test' |
  'Create Question' | 'View Question' | 'Edit Question' | 'Delete Question';


//export type PermissionValues =
//    'users.view' | 'users.manage' |
//    'roles.view' | 'roles.manage' | 'roles.assign';

export type PermissionValues =
  'users.view' | 'users.manage' |
  'roles.view' | 'roles.manage' | 'roles.assign' |
  'test.take' | 'test.viewresult' | 'test.create' | 'test.view' | 'test.edit' | 'test.delete' |
  'question.create' | 'question.view' | 'question.edit' | 'question.delete';

export class Permission {

  public static readonly viewUsersPermission: PermissionValues = 'users.view';
  public static readonly manageUsersPermission: PermissionValues = 'users.manage';

  public static readonly viewRolesPermission: PermissionValues = 'roles.view';
  public static readonly manageRolesPermission: PermissionValues = 'roles.manage';
  public static readonly assignRolesPermission: PermissionValues = 'roles.assign';


  // Test management permissions
  public static readonly takeTestPermission: PermissionValues = 'test.take';
  public static readonly viewTestResultsPermission: PermissionValues = 'test.viewresult';
  public static readonly createTestPermission: PermissionValues = 'test.create';
  public static readonly viewTestsPermission: PermissionValues = 'test.view';
  public static readonly editTestsPermission: PermissionValues = 'test.edit';
  public static readonly deleteTestsPermission: PermissionValues = 'test.delete';

  // Question management permissions
  public static readonly createQuestionPermission: PermissionValues = 'question.create';
  public static readonly viewQuestionPermission: PermissionValues = 'question.view';
  public static readonly editQuestionPermission: PermissionValues = 'question.edit';
  public static readonly deleteQuestionPermission: PermissionValues = 'question.delete';



  constructor(name?: PermissionNames, value?: PermissionValues, groupName?: string, description?: string) {
    this.name = name;
    this.value = value;
    this.groupName = groupName;
    this.description = description;
  }

  public name: PermissionNames;
  public value: PermissionValues;
  public groupName: string;
  public description: string;
}
