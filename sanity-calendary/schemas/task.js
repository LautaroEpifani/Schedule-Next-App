export default {
    name: 'task',
    title: 'Task',
    type: 'document',
    fields: [
        {
           name: 'title',
           title: 'Title',
           type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        },
        {
            name: 'label',
            title: 'Label',
            type: 'string'

        },
        {
            name: 'id',
            title: 'Id',
            type: 'string'

        },
    ],
  //     orderings: [
  //   {
  //     title: 'Title Desc',
  //     name: 'titleDesc',
  //     by: [
  //       {field: 'title', direction: 'desc'}
  //     ]
  //   },
   
  // ]

}