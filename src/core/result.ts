
export type Result<value, problem = never>
  = { kind: 'success', value: value }
  | { kind: 'failure', problem: problem }

export const Result = {
  toUnion: <v, p>(result: Result<v, p>): v | p => {
    switch (result.kind) {
      case 'success': return result.value
      case 'failure': return result.problem
    }
  }
}