function JsonPreview({ tree }) {
  return (
    <pre className="json-preview">
      {JSON.stringify(tree, null, 2)}
    </pre>
  );
}

export default JsonPreview;
