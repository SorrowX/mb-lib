export default () => {
  return {
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    nameKey: {
      type: String,
      default: 'name',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    collapse: {
      type: Boolean,
      default: false,
    },
    collapseCount: {
      type: Number,
      default: 1,
    },
    labelSeparator: {
      type: String,
      default: ', ',
    },
    formatter: {
      type: Function,
    },
    tagSize: {
      type: String,
      default: 'medium',
    },
  }
}
