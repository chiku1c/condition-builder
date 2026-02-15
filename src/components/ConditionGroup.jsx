import { addRule, addGroup, deleteNode, updateGroupOperator } from '../utils/conditionTree';
import ConditionRule from './ConditionRule';

function ConditionGroup({ node, path, tree, onChange }) {
  if (node.type !== 'group') return null;

  const isRoot = path.length === 0;

  const handleOperatorChange = (e) => {
    onChange(updateGroupOperator(tree, path, e.target.value));
  };
  const handleAddRule = () => {
    onChange(addRule(tree, path));
  };
  const handleAddGroup = () => {
    onChange(addGroup(tree, path));
  };
  const handleDeleteGroup = () => {
    if (isRoot) return;
    onChange(deleteNode(tree, path));
  };

  return (
    <div className="condition-group">
      <div className="condition-group-header">
        <select
          value={node.operator}
          onChange={handleOperatorChange}
          aria-label="Group operator"
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
        {!isRoot && (
          <button type="button" onClick={handleDeleteGroup} className="btn-delete" aria-label="Delete group">
            Delete group
          </button>
        )}
      </div>
      <div className="condition-group-children">
        {node.children.map((child, index) => {
          const childPath = path.concat(index);
          if (child.type === 'rule') {
            return (
              <ConditionRule
                key={childPath.join('-')}
                node={child}
                path={childPath}
                tree={tree}
                onChange={onChange}
              />
            );
          }
          if (child.type === 'group') {
            return (
              <ConditionGroup
                key={childPath.join('-')}
                node={child}
                path={childPath}
                tree={tree}
                onChange={onChange}
              />
            );
          }
          return null;
        })}
      </div>
      <div className="condition-group-actions">
        <button type="button" onClick={handleAddRule} className="btn-add">
          Add Rule
        </button>
        <button type="button" onClick={handleAddGroup} className="btn-add">
          Add Group
        </button>
      </div>
    </div>
  );
}

export default ConditionGroup;
