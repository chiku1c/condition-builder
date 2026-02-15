
import { FIELDS, OPERATORS } from '../constants';
import { NODE_TYPES } from '../types';

function createDefaultRule() {
  return {
    type: NODE_TYPES.RULE,
    field: FIELDS[0] ?? 'Price',
    operator: OPERATORS[0] ?? '=',
    value: '',
  };
}

function createDefaultGroup() {
  return {
    type: NODE_TYPES.GROUP,
    operator: 'AND',
    children: [],
  };
}

export function getNodeAtPath(tree, path) {
  if (path.length === 0) return tree;
  let node = tree;
  for (let i = 0; i < path.length; i++) {
    const idx = path[i];
    if (node.type !== NODE_TYPES.GROUP || !node.children[idx]) return null;
    node = node.children[idx];
  }
  return node;
}

function getParentAndIndex(tree, path) {
  if (path.length === 0) return null;
  const parentPath = path.slice(0, -1);
  const index = path[path.length - 1];
  const parent = getNodeAtPath(tree, parentPath);
  if (parent?.type !== NODE_TYPES.GROUP) return null;
  return { parent, index };
}

function setNodeAtPath(tree, path, updater) {
  if (path.length === 0) {
    const updated = updater(tree);
    return updated.type === NODE_TYPES.GROUP ? updated : tree;
  }
  const parentPath = path.slice(0, -1);
  const index = path[path.length - 1];
  const parent = getNodeAtPath(tree, parentPath);
  if (parent?.type !== NODE_TYPES.GROUP) return tree;
  const newChildren = [...parent.children];
  const current = newChildren[index];
  if (!current) return tree;
  newChildren[index] = updater(current);
  const newParent = { ...parent, children: newChildren };
  return setNodeAtPath(tree, parentPath, () => newParent);
}

function insertChild(tree, parentPath, newChild, atIndex = undefined) {
  const parent = getNodeAtPath(tree, parentPath);
  if (parent?.type !== NODE_TYPES.GROUP) return tree;
  const newChildren = [...parent.children];
  const idx = atIndex !== undefined ? atIndex : newChildren.length;
  newChildren.splice(idx, 0, newChild);
  const newParent = { ...parent, children: newChildren };
  if (parentPath.length === 0) return newParent;
  return setNodeAtPath(tree, parentPath, () => newParent);
}

function removeChildAtPath(tree, path) {
  if (path.length === 0) return tree;
  const { parent, index } = getParentAndIndex(tree, path) ?? {};
  if (parent == null) return tree;
  const newChildren = parent.children.filter((_, i) => i !== index);
  const newParent = { ...parent, children: newChildren };
  if (path.length === 1) {
    return newParent;
  }
  return setNodeAtPath(tree, path.slice(0, -1), () => newParent);
}

export function createInitialTree(withDefaultRule = false) {
  const children = withDefaultRule ? [createDefaultRule()] : [];
  return {
    type: NODE_TYPES.GROUP,
    operator: 'AND',
    children,
  };
}

export function addRule(tree, parentPath) {
  const parent = getNodeAtPath(tree, parentPath);
  if (parent?.type !== NODE_TYPES.GROUP) return tree;
  return insertChild(tree, parentPath, createDefaultRule());
}

export function addGroup(tree, parentPath) {
  const parent = getNodeAtPath(tree, parentPath);
  if (parent?.type !== NODE_TYPES.GROUP) return tree;
  return insertChild(tree, parentPath, createDefaultGroup());
}

export function deleteNode(tree, path) {
  if (path.length === 0) return tree;
  return removeChildAtPath(tree, path);
}

export function updateRule(tree, path, updates) {
  const node = getNodeAtPath(tree, path);
  if (node?.type !== NODE_TYPES.RULE) return tree;
  const next = {
    ...node,
    ...(updates.field !== undefined && { field: updates.field }),
    ...(updates.operator !== undefined && { operator: updates.operator }),
    ...(updates.value !== undefined && { value: updates.value }),
  };
  return setNodeAtPath(tree, path, () => next);
}

export function updateGroupOperator(tree, path, operator) {
  const node = getNodeAtPath(tree, path);
  if (node?.type !== NODE_TYPES.GROUP) return tree;
  return setNodeAtPath(tree, path, () => ({ ...node, operator }));
}
