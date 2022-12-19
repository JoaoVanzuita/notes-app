import { CircularProgress, Grid, Typography, useTheme } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NoteCard } from '../shared/components/Note'
import { Toolbar } from '../shared/components/Toolbar'
import { useAuthContext } from '../shared/contexts/auth/AuthContext'
import { useDebounce } from '../shared/hooks'
import { BasePageLayout } from '../shared/layouts/BasePageLayout'
import { ResponseError } from '../shared/services/api/errors'
import { NotesService } from '../shared/services/api/notes'
import { Note } from '../shared/types'
import Swal from 'sweetalert2'

export const Home = () => {
  const alertBackground = useTheme().palette.background.default
  const alertColor = useTheme().palette.mode === 'light' ? '#000000' : '#ffffff'
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { debounce } = useDebounce()
  const { signout } = useAuthContext()
  const [notes, setNotes] = useState<Note[]>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const fetchNotes = useCallback(async () =>{

    const result = await NotesService.getByTitle(search)

    if(result instanceof ResponseError){
      alert(result.statusCode + ' - ' + result.message)
      return
    }

    setNotes(result)
  },[])

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  useEffect(() => {
    debounce(() => {
      setIsLoading(true)
      setNotes([])

      NotesService.getByTitle(search)
        .then((result) => {
          setIsLoading(false)

          if(result instanceof ResponseError){
            setNotes([])
            return
          }

          setNotes(result)
        })
    })
  }, [search])


  const handleNewNote = useCallback(async () => {

    const note = {
      title: '',
      description: '',
      updatedOn: new Date()
    }

    const result = await NotesService.create(note)

    if(result instanceof ResponseError){
      alert(result.message.toString())
      return
    }

    fetchNotes()
  },[])

  const handleDelete = useCallback(async (id: number) => {

    const result = await NotesService.deleteById(id)

    if(result instanceof ResponseError){
      alert(result.message.toString())
      return
    }

    fetchNotes()
  },[])

  const handleSave = useCallback(async (note: Note) => {

    const result = await NotesService.updateById(note)

    if(result instanceof ResponseError){
      alert(result.message.toString())
      return
    }

    fetchNotes()
  },[])

  const handleExit = useCallback(async () => {
    const result = await signout()

    if(result){
      Swal.fire({
        titleText: `Ocorreu um erro - Código: ${result.statusCode}`,
        text: result.message,
        icon: 'error',
        background: alertBackground,
        color: alertColor
      })
      return
    }

    setSearchParams('')
    window.location.reload()
  }, [])

  return(
    <BasePageLayout
      title='Minhas notas'
      toolbar={<Toolbar
        showButtonManageAccount
        showButtonNew
        showSearchInput
        showButtonExit

        textSearch={search}

        onClickButtonExit={handleExit}
        onChangeTextSearch={text => setSearchParams({ search: text }, {replace: true})}
        onClickButtonNew={handleNewNote}
        onClickButtonManageAccount={() => navigate('/manage-account')}
      />}
    >
      <Grid container display='flex' alignItems='center' justifyContent='center'>

        {isLoading && <CircularProgress/>}
        {!isLoading && notes.length == 0 &&
          <Typography variant='h5'>
            Nenhuma nota encontrada
          </Typography>
        }

        {notes.map(note =>(

          <Grid key={Math.random()} item>
            <NoteCard
              noteId={note.id}
              noteTitle={note.title}
              noteDescription={note.description}
              noteUpdatedOn={note.updatedOn}
              onClickButtonSave={handleSave}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onClickButtonDelete={() => handleDelete(note.id!)}
            />
          </Grid>

        ))}

      </Grid>
    </BasePageLayout>
  )
}