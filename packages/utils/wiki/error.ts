export const GlobalPrefixError = 'missing prefix \'{{Infobox\' at the start'
export const GlobalSuffixError = 'missing suffix \'}}\' at the end'
export const ArrayNoCloseError = 'array should be closed by \'}\''
export const ArrayItemWrappedError = 'array item should be wrapped by \'[]\''
export const ExpectingNewField = 'missing \'|\' to start a new field'
export const ExpectingSignEqualError = 'missing \'=\' to separate field name and value'

export class WikiSyntaxError extends Error {
  line: string
  lino: number

  constructor (line: string, lino: number, message: string) {
    super(message)
    this.line = line
    this.lino = lino
  }
}
