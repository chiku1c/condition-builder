import { FIELDS, OPERATORS } from '../constants';
import { updateRule, deleteNode } from '../utils/conditionTree';

function ConditionRule({ node, path, tree, onChange }) {
  if (node.type !== 'rule') return null;

  const handleFieldChange = (e) => {
    onChange(updateRule(tree, path, { field: e.target.value }));
  };
  const handleOperatorChange = (e) => {
    onChange(updateRule(tree, path, { operator: e.target.value }));
  };
  const handleValueChange = (e) => {
    onChange(updateRule(tree, path, { value: e.target.value }));
  };
  const handleDelete = () => {
    onChange(deleteNode(tree, path));
  };

  return (
    <div className="condition-rule">
      <select
        value={node.field}
        onChange={handleFieldChange}
        aria-label="Field"
      >
        {FIELDS.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
      <select
        value={node.operator}
        onChange={handleOperatorChange}
        aria-label="Operator"
      >
        {OPERATORS.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
      <input
        type="text"
        value={node.value}
        onChange={handleValueChange}
        placeholder="Value"
        aria-label="Value"
      />
      <button type="button" onClick={handleDelete} className="btn-delete" aria-label="Delete rule">
        Delete
      </button>
      {node.value.trim() === '' && (
        <span className="validation-msg" role="alert">Value is required</span>
      )}
    </div>
  );
}

export default ConditionRule;
