import { Grid } from '@mui/material'
import { NoteCard } from '../shared/components/Note'
import { Toolbar } from '../shared/components/Toolbar'
import { BasePageLayout } from '../shared/layouts/BasePageLayout'
import { Note } from '../shared/types'

export const Home = () => {

  const notes: Note[] = [
    {
      id: 1,
      title: 'test 1',
      description: 'test 1',
      updatedAt: new Date()
    },
    {
      id: 2,
      title: 'test 2',
      description: 'test 2',
      updatedAt: new Date()
    },
    {
      id: 3,
      title: 'test 3',
      description: 'test 3',
      updatedAt: new Date()
    },
    {
      id: 4,
      title: 'test 4',
      description: 'test 4',
      updatedAt: new Date()
    },
    {
      id: 5,
      title: 'test 5',
      description: 'test 5',
      updatedAt: new Date()
    },
    {
      id: 6,
      title: 'test 6',
      description: 'test 6',
      updatedAt: new Date()
    },
    {
      id: 7,
      title: 'test 7',
      description: 'test 7',
      updatedAt: new Date()
    },
    {
      id: 8,
      title: 'test 8',
      description: 'test ',
      updatedAt: new Date()
    },
  ]

  return(
    <BasePageLayout
      title='Minhas notas'
      toolbar={<Toolbar
        showButtonNew
        showSearchInput
        showButtonExit
      />}
    >

      <Grid container display='flex' alignItems='center' justifyContent='center'>

        {notes.map(note =>(

          <Grid key={note.id} item  >
            <NoteCard
              noteId={note.id}
              noteTitle={note.title}
              noteDescription={note.description}
              noteUpdatedAt={note.updatedAt}
            />
          </Grid>

        ))}

      </Grid>
    </BasePageLayout>
  )
}