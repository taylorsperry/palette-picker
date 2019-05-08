const data = [
  {
    name: 'My project',
    palettes: [
      { palette_name: "palette4", 
        color_1: "blue", 
        color_2: "blue", 
        color_3: "blue", 
        color_4: "blue", 
        color_5: "blue"
      },
      { palette_name: "palette5", 
        color_1: "pink", 
        color_2: "pink", 
        color_3: "pink", 
        color_4: "pink", 
        color_5: "pink"
      }
    ]
  },
  {
    name: 'My other project',
    palettes: [
      { palette_name: "palette6", 
        color_1: "green", 
        color_2: "green", 
        color_3: "green", 
        color_4: "green", 
        color_5: "green"
      },
      { palette_name: "palette7", 
        color_1: "yellow", 
        color_2: "yellow", 
        color_3: "yellow", 
        color_4: "yellow", 
        color_5: "yellow"
      }
    ]
  }
]

const createProject = (knex, project) => {
  return knex('projects').insert({
    name: project.name
  }, 'id')
  .then(projectIds => {
    let palettePromises = [];

    project.palettes.forEach(palette => {
      palettePromises.push(
        createPalette(knex, {
          palette_name: palette.palette_name,
          color_1: palette.color_1,
          color_2: palette.color_2,
          color_3: palette.color_3,
          color_4: palette.color_4,
          color_5: palette.color_5,
          project_id: projectIds[0]
        })
      )
    })

    return Promise.all(palettePromises)
  })
}

const createPalette = ( knex, palette) => {
  return knex ('palettes').insert(palette)
}

exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = [];

      data.forEach( d => {
        projectPromises.push(createProject(knex, d))
      })
      return Promise.all(projectPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
