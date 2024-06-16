const questionnaire = {
  total: 25,
  general: {
    count: 5,
    1: 'I could use the device effectively to complete tasks.',
    2: 'I am confident that I can operate the device correctly (as intended by the manufacturer).',
    3: 'I could quickly master using the device’s main features.',
    4: 'The device is an advancement in terms of its user-friendliness.',
    5: 'I am confident that I can use the device safely.'
  },
  safety: {
    count: 2,
    1: 'The device does not cause unnecessary exposure to hazards (things that cause harm).',
    2: 'I am aware of the things I should not do with the device (things that could harm me or others)'
  },
  mitigation: {
    count: 2,
    1: 'The device protects me from making serious mistakes.',
    2: 'If I make a mistake, the device will help me recover.'
  },
  clarity: {
    count: 7,
    1: 'The device’s functional capabilities are clear.',
    2: 'The device makes its operational status clear.',
    3: 'The device provides effective user feedback (reacts in informative ways to what I am doing).',
    4: 'Parts of the device are labeled to the extent that is necessary and helpful.',
    5: 'The device effectively communicates important information.',
    6: 'The instructions and/or training materials have all the information I need.',
    7: 'The instructions and/or training materials are clear.'
  },
  usability: {
    count: 5,
    1: 'The device is easy to use.',
    2: 'The device enables me to complete tasks in an appropriate amount of time.',
    3: 'The number of steps to use the device is acceptable.',
    4: 'The device does not require me to memorize things.',
    5: 'I can apply my prior knowledge, skills, and experience to learn how to use this device.'
  },
  ergonomics: {
    count: 1,
    1: 'The device is comfortable to handle (e.g., grasp, orient, actuate).'
  },
  appeal: {
    count: 3,
    1: 'The device has pleasing physical characteristics (size, shape, material texture, styling, etc.)',
    2: 'The device presents information in a pleasing way (layout, typography, graphics, colors, etc.)',
    3: 'I would prefer to use this device over other devices with similar functions.'
  }
};

// module.exports = questionnaire;
export default questionnaire;