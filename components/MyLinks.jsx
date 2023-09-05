export const links = [
  { name: 'Inicio', link: '/' },
  { name: 'Noticias', link: '/category/noticies' },
  {
    name: 'Programación',
    submenu: true,
    sublinks: [
      {
        Head: 'Front End',
        sublink: [
          { name: 'Html', link: '/category/html' },
          { name: 'Css', link: '/category/css' },
          { name: 'JavaScript', link: '/category/javascript' },
          { name: 'React', link: '/category/react' },
        ],
      },
      {
        Head: 'Back End',
        sublink: [
          { name: 'Java', link: '/category/java' },
          { name: 'Php', link: '/category/php' },
          { name: 'Python', link: '/category/python' },
        ],
      },
    ],
  },
  { name: 'Ciberseguridad', link: '/category/cibersecurity' },
]
