const migrationData = {
  data: [
    {
      name: 'A',
      description: 'This is a description of A',
      parent: '',
    },
    {
      name: 'B',
      description: 'This is a description of B',
      parent: 'A',
    },
    {
      name: 'C',
      description: 'This is a description of C',
      parent: 'A',
    },
    {
      name: 'D',
      description: 'This is a description of D',
      parent: 'A',
    },
    {
      name: 'B-1',
      description: 'This is a description of B-1',
      parent: 'B',
    },
    {
      name: 'B-2',
      description: 'This is a description of B-2',
      parent: 'B',
    },
    {
      name: 'B-3',
      description: 'This is a description of B-3',
      parent: 'B',
    },
    {
      name: 'B-1-1',
      description: 'This is a description of B-1-1',
      parent: 'B-1',
    },
    {
      name: 'B-1-2',
      description: 'This is a description of B-1-2',
      parent: 'B-1',
    },
    {
      name: 'B-2-1',
      description: 'This is a description of B-2-1',
      parent: 'B-2',
    },
    {
      name: 'B-2-1-1',
      description: 'This is a description of B-2-1-1',
      parent: 'B-2-1',
    },
    {
      name: 'B-2-1-1-1',
      description: 'This is a description of B-2-1-1-1',
      parent: 'B-2-1-1',
    },
    {
      name: 'B-2-1-2',
      description: 'This is a description of B-2-1-2',
      parent: 'B-2-1',
    },
  ],
};

export default migrationData;
