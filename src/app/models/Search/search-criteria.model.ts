export interface SearchCriteria {
  isActive: boolean;
  filterRules: FilterRule[];
}

export interface FilterRule {
  field: string;
  operation: string;
  value: any;
  availableOperations: string[]
}
