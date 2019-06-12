module.exports = {
  base: '/specification/',
  title: '墨锋科技',
  description: 'smart coding',
  themeConfig: {
    displayAllHeaders: true,
    sidebarDepth: 3,
    sidebar: [
      {
        title: 'Specification',
        path: '/',
        collapsable: false,
        sidebarDepth: 3,
        children: []
      },
      {
        title: 'RESTFul',
        path: '/restful/',
        collapsable: false,
        sidebarDepth: 3,
        children: []
      }
    ]
  }
}
