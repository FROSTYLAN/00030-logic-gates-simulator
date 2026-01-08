export type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

export interface LogicState {
  a: boolean;
  b: boolean;
  gate: GateType;
}

export const GATES: GateType[] = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];

export function evaluateGate(gate: GateType, a: boolean, b: boolean): boolean {
  switch (gate) {
    case 'AND':
      return a && b;
    case 'OR':
      return a || b;
    case 'NOT':
      return !a; // NOT only uses input A
    case 'NAND':
      return !(a && b);
    case 'NOR':
      return !(a || b);
    case 'XOR':
      return a !== b;
    case 'XNOR':
      return a === b;
    default:
      return false;
  }
}

export function getTruthTable(gate: GateType): { a: boolean; b: boolean; out: boolean }[] {
  const inputs = [
    { a: false, b: false },
    { a: false, b: true },
    { a: true, b: false },
    { a: true, b: true },
  ];

  return inputs.map(({ a, b }) => ({
    a,
    b,
    out: evaluateGate(gate, a, b),
  }));
}
