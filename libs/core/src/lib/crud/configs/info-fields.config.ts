import { DataType } from '../../common';

export const infoFieldsConfig = [
  [{ field: 'id', label: 'ID:', type: DataType.Text }],
  [{ field: 'updated_version', label: 'Updated Version:', type: DataType.Numeric }],
  [
    { field: 'created_by', label: 'Created By', type: DataType.Text },
    { field: 'created_at', label: 'At', type: DataType.Datetime, format: 'medium' }
  ],
  [
    { field: 'updated_by', label: 'Updated By', type: DataType.Text, },
    { field: 'updated_at', label: 'At', type: DataType.Datetime, format: 'medium' }
  ]
];