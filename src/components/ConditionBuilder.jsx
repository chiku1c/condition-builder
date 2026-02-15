import ConditionGroup from './ConditionGroup';
import JsonPreview from './JsonPreview';

function ConditionBuilder({ tree, onTreeChange }) {
  return (
    <div className="condition-builder">
      <ConditionGroup
        node={tree}
        path={[]}
        tree={tree}
        onChange={onTreeChange}
      />
      <JsonPreview tree={tree} />
    </div>
  );
}

export default ConditionBuilder;
